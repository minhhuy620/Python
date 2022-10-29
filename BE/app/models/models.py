from datetime import datetime
from typing import Optional, List, Union
from sqlalchemy.types import String, Integer, Boolean
from sqlalchemy import DateTime, Column, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base


class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime)
    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"
    item_id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    created_date = Column(DateTime, default=datetime.utcnow)
    updated_date = Column(DateTime)
    owner_id = Column(Integer, ForeignKey("users.user_id"))
    owner = relationship("User", back_populates="items")
