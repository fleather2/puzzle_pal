from sqlalchemy import ForeignKey, Table, Column, LargeBinary
from sqlalchemy.orm import DeclarativeBase, Mapped, MappedAsDataclass, mapped_column, relationship
from typing import List
from dataclasses import dataclass
import bcrypt


class Base(DeclarativeBase):
    """SQLAlchemy default base class"""
    pass

@dataclass
class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    password = Column(LargeBinary)
    password_salt = Column(LargeBinary)

    def verify_password(self, _password: str) -> bool:
        r = bcrypt.checkpw(bytes(_password), bytes(self.password))
        return r

@dataclass
class Puzzle(Base):
    __tablename__ = "puzzle"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique = True)

@dataclass
class Portion(Base):
    __tablename__ = "portion"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    is_completed: Mapped[bool]
    puzzle_name: Mapped[str] = mapped_column(ForeignKey("puzzle.name"))
    assigned_user_name: Mapped[str] = mapped_column(ForeignKey("user.name"))
