from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Any
import jwt
from app.services import services
from fastapi import HTTPException, status
from pydantic import ValidationError
from app.schemas.schemas import TokenDataUser
import calendar
from starlette import status

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 1  # 1 days
ALGORITHM = "HS256"
SECRET_KEY = "SECRET_KEY"
REFRESH_SECRET_KEY = "REFRESH_SECRET_KEY"

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def authenticate_user(db, email: str):
    user = services.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="Email not found")
    return user


def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=REFRESH_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def decode_access_token(db, token):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    check_token = token.credentials
    try:
        payload = jwt.decode(check_token, SECRET_KEY, algorithms=[ALGORITHM])

        email: str = payload.get("sub")
        expires = payload.get("exp")

        if email is None:
            raise credentials_exception
        token_data = TokenDataUser(email=email, expires=expires)
        # token_data = TokenPayload(**payload)

    except (jwt.JWTError, ValidationError):
        raise credentials_exception

    # validate username
    user = services.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # check token expiration
    if (
        datetime.utcfromtimestamp(calendar.timegm(token_data.expires.timetuple()))
        < datetime.utcnow()
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
