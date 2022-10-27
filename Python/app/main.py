from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from app.db import SessionLocal, db_engine
from . import services, schemas, models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.auth import OAuth2PasswordBearerWithCookie
from app.utils import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    verify_password,
    decode_access_token
)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


# def get_db(request: Request):
#     return request.state.db


use_oauth = OAuth2PasswordBearer(
    scheme_name="JWT",
    tokenUrl="/token"
)


class Users:
    def get_current_active_user(db: Session = Depends(get_db),
                                token: str = Depends(use_oauth)):
        return decode_access_token(db, token)

    @app.post("/user", response_model=schemas.User)
    async def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
        db_user = services.get_user_by_email(db, email=user.email)
        if db_user is not None:
            raise HTTPException(
                status_code=409, detail="User with this email already exist")
        signed_user = services.create_user(db=db, user=user)
        return signed_user

    @app.post('/token', response_model=schemas.LoginUserToken)
    async def login(response: Response, db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
        user = authenticate_user(db, form_data.username, form_data.password)
        if user is None:
            raise HTTPException(
                status_code=400,
                detail="Incorrect email or password"
            )

        hashed_pass = user.hashed_password
        if not verify_password(form_data.password, hashed_pass):
            raise HTTPException(
                status_code=400,
                detail="Incorrect email or password"
            )
        access_token = create_access_token(user.email)
        response.set_cookie(key='Bearer', value=f'{access_token}', httponly=True)
        return {
            "access_token": access_token,
            "token_type": "Bearer"
        }

    @app.get("/users", response_model=list[schemas.User])
    async def read_users(
            skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
    ):
        users = services.get_users(db, skip=skip, limit=limit)
        return users

    @app.get("/users/{user_id}", response_model=schemas.GetUser)
    async def read_user(user_id: int, db: Session = Depends(get_db)):
        db_user = services.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )
        return db_user

    @app.get("/item/{item_id}", response_model=schemas.GetItem)
    async def get_item(item_id: int, db: Session = Depends(get_db)):
        db_item = services.get_item(db, item_id=item_id)
        if db_item is None:
            raise HTTPException(
                status_code=404, detail=f"Item with id {item_id} not found"
            )
        return db_item

    @app.post("/users/{user_id}/items", response_model=schemas.Item)
    async def create_item_for_user(
            user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
    ):
        return services.create_user_item(db=db, item=item, user_id=user_id)

    @app.put("/users/{user_id}", response_model=schemas.User)
    async def update_user(
            user_id: int, data: schemas.UserUpdate, db: Session = Depends(get_db)
    ):
        updated_user = services.update_user(db, user_id, data)
        if not updated_user:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )
        return updated_user

    @app.get("/items", response_model=list[schemas.Item])
    async def read_items(
            skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
    ):
        items = services.get_items(db, skip=skip, limit=limit)
        return items

    @app.delete("/users/{user_id}")
    def delete_user(user_id: int, db: Session = Depends(get_db)):
        user_check = services.get_user(db, user_id=user_id)
        if not user_check:
            raise HTTPException(
                status_code=404, detail=f"User with id {user_id} not found"
            )
        else:
            services.delete_user(user_id, db)
        return {"detail": f"Deleted User have id: {user_id}"}

    @app.delete("/item/{item_id}")
    def delete_item(item_id: int, db: Session = Depends(get_db)):
        item_check = services.get_item(db, item_id=item_id)
        if not item_check:
            raise HTTPException(
                status_code=404, detail=f"Item with id {item_id} not found"
            )
        else:
            services.delete_item(item_id, db)
        return {"detail": f"Deleted Item have id: {item_id}"}

    @app.get("/users/me/", response_model=schemas.User)
    async def read_users_me(current_user: schemas.User = Depends(get_current_active_user)):
        return current_user
