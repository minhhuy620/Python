from datetime import datetime
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models import User, Item
from app.schemas import UserCreate, ItemCreate, UserUpdate
from app.utils import get_hashed_password


# database = databases.Database(DATABASE_URL)

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    try:
        hashed_password = get_hashed_password(user.password)
        db_user = User(email=user.email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as ex:
        print(ex)
        db.rollback()


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int):
    return db.query(Item).filter(Item.item_id == item_id).first()


def create_user_item(db: Session, item: ItemCreate, user_id: int):
    try:
        db_item = Item(**item.dict(), owner_id=user_id)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except Exception as ex:
        print(ex)
        db.rollback()


def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if not db_user:
        return 0
    db_user.hashed_password = get_hashed_password(user.password)
    db_user.is_active = user.is_active
    db_user.updated_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_item(db: Session, user_id: int, user: UserUpdate):
    db_user_item = db.query(User).filter(User.user_id == user_id).first()
    if not db_user_item:
        return 0
    db_user_item.hashed_password = get_hashed_password(user.password)
    db_user_item.is_active = user.is_active
    db_user_item.updated_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db.add(db_user_item)
    db.commit()
    db.refresh(db_user_item)
    return db_user_item


def delete_user(user_id: int, db: Session):
    try:
        db_user = db.query(User).filter(User.id == user_id).first()
        db.delete(db_user)
        db.commit()
    except Exception as ex:
        print(ex)
        db.rollback()


def delete_item(item_id: int, db: Session):
    try:
        db_item = db.query(Item).filter(Item.item_id == item_id).first()
        db.delete(db_item)
        db.commit()
    except Exception as ex:
        print(ex)
        db.rollback()
