from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from .services import services
from .models import models
from app.database.db import SessionLocal, db_engine
from .schemas import schemas
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from datetime import timedelta
from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials,
)
from app.configs.utils import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    verify_password,
    decode_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)

app = FastAPI()

origins = ["http://localhost", "http://localhost:8000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


# Dependency
def get_db():
    db = SessionLocal(bind=db_engine)
    try:
        yield db
    finally:
        db.close()


class Users:
    def get_current_active_user(
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(security),
    ):
        return decode_access_token(db, token)

    @app.post("/register", response_model=schemas.User)
    async def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
        db_user = services.get_user_by_email(db, email=user.email)
        if db_user is not None:
            raise HTTPException(
                status_code=409, detail="User with this email already exist"
            )
        signed_user = services.create_user(db=db, user=user)
        return signed_user

    @app.post("/login")
    async def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
        user = authenticate_user(db, data.email)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        if not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(user.email, access_token_expires)
        data = {"email": user.email, "access_token": access_token}
        response = JSONResponse(data)
        # response.set_cookie(key="Bearer", value=f"{access_token}", httponly=True)
        return response

    @app.get("/users", response_model=list[schemas.User])
    async def read_users(
        skip: int = 0,
        limit: int = 100,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        users = services.get_users(db, skip=skip, limit=limit)
        return users

    @app.get("/users/{user_id}", response_model=schemas.GetUser)
    async def read_user(
        user_id: int,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        db_user = services.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )
        return db_user

    @app.post("/users/{user_id}/items", response_model=schemas.Item)
    async def create_item_for_user(
        user_id: int,
        item: schemas.ItemCreate,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        return services.create_user_item(db=db, item=item, user_id=user_id)

    @app.put("/users/{user_id}", response_model=schemas.User)
    async def update_user(
        user_id: int,
        data: schemas.UserUpdate,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        updated_user = services.update_user(db, user_id, data)
        if not updated_user:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )
        return updated_user

    @app.get("/item/{item_id}", response_model=schemas.GetItem)
    async def get_item(
        item_id: int,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        db_item = services.get_item(db, item_id=item_id)
        if db_item is None:
            raise HTTPException(
                status_code=404, detail=f"Item with id {item_id} not found"
            )
        return db_item

    @app.get("/items", response_model=list[schemas.Item])
    async def read_items(
        skip: int = 0,
        limit: int = 100,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        items = services.get_items(db, skip=skip, limit=limit)
        return items

    @app.delete("/items/{item_id}")
    def delete_item(
        item_id: int,
        current_user: schemas.User = Depends(get_current_active_user),
        db: Session = Depends(get_db),
    ):
        item_check = services.get_item(db, item_id=item_id)
        if not item_check:
            raise HTTPException(
                status_code=404, detail=f"Item with id {item_id} not found"
            )
        else:
            services.delete_item(item_id, db)
        return {"detail": f"Deleted Item have id: {item_id}"}

    @app.get("/token", response_model=schemas.User)
    async def read_users_me(
        current_user: schemas.User = Depends(get_current_active_user),
    ):
        return current_user
