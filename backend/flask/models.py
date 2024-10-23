from sqlalchemy import ForeignKey, Table, Column
from sqlalchemy.orm import DeclarativeBase, Mapped, MappedAsDataclass, mapped_column, relationship
from typing import List
#import bcrypt


class Base(MappedAsDataclass, DeclarativeBase):
    """SQLAlchemy default base class"""
    pass

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(init=True, primary_key=True)
    name: Mapped[str]
    password: Mapped[str]

    # def verify_password(self, password):
    #     pswash = bcrypt.hashpw()

class Puzzle(Base):
    __tablename__ = "puzzle"
    id: Mapped[int] = mapped_column(init=True, primary_key=True)
    name: Mapped[str]
    portions: Mapped[List["Portion"]] = relationship(default_factory=list)

class Portion(Base):
    __tablename__ = "portion"
    id: Mapped[int] = mapped_column(init=True, primary_key=True)
    name: Mapped[str]
    is_completed: Mapped[bool]
    puzzle_id: Mapped[int] = mapped_column(ForeignKey("puzzle.id"))
    assigned_user: Mapped["User"] = relationship()
