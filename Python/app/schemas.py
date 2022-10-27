from datetime import datetime
from lib2to3.pgen2.token import OP
from typing import Union, Optional
from pydantic import BaseModel, Field
from fastapi import Body


class ItemBase(BaseModel):
    item_id: int
    title: str
    description: Union[str, None] = None
    created_date: Union[datetime, None] = Body(default=None)
    updated_date: Union[datetime, None] = Body(default=None)
    owner_id: int

class ItemCreate(BaseModel):
    title: str
    description: Union[str, None] = None      


class ItemUpdate(BaseModel):
    title: str
    description: Union[str, None] = None
    created_date: Union[datetime, None] = Body(default=None)
    updated_date: Union[datetime, None] = Body(default=None)


class Item(ItemBase):
    class Config:
        orm_mode = True


class GetItem(BaseModel):
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class GetUser(BaseModel):
    user_id: int

    class Config:
        orm_mode = True


class User(UserBase):
    user_id: int
    created_date: Union[datetime, None] = Body(default=None)
    updated_date: Union[datetime, None] = Body(default=None)
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    password: str
    is_active: bool


class LoginUserToken(BaseModel):
    access_token: str
    token_type: str
    # refresh_token: str


class UserCreate(BaseModel):
    email: str
    password: str = Field(..., min_length=5, max_length=24,
                          description="User Password")


class TokenDataUser(BaseModel):
    email: Union[str, None] = None
    expires: Optional[datetime]


class UserOut(BaseModel):
    email: str


class SystemUser(UserOut):
    password: str
