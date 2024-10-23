from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError as SqlalchemyOperationalError
from time import sleep
from loguru import logger

from models import * 
import os
env = os.environ

FLASK_HOST = "localhost"
DROP_TABLES_ON_INIT = True

### SETUP ###
try:
    POSTGRES_DB = env["POSTGRES_DB"]
    POSTGRES_USER = env["POSTGRES_USER"]
    POSTGRES_PASSWORD = env["POSTGRES_PASSWORD"]
except KeyError as e:
    print(f"ERROR: Environment variables not set. Using defautls\n{e}")
    POSTGRES_DB = "church_db"
    POSTGRES_USER = "church_user"
    POSTGRES_PASSWORD = "church_password"

app = Flask(__name__)
CORS(app)
url = URL.create(
    drivername="postgresql",
    username=POSTGRES_USER,
    password=POSTGRES_PASSWORD,
    host="db",
    port=5432,
    database=POSTGRES_DB
)

engine = create_engine(url)

# for i in range(0, 5):
#     try:
#         if DROP_TABLES_ON_INIT:
#             logger.info("Dropping all data")
#             Base.metadata.drop_all(bind=engine, tables=[User.__table__, Puzzle.__table__, Portion.__table])
#             break
#     except:
#         logger.error("Database init failed. Is database initialized yet? Retrying...")
#         sleep(2)

Base.metadata.create_all(engine)

### CRUD USERS ###
@app.route('/user', methods=['POST'])
def create_user():
    with Session(engine) as session:
        logger.debug(f'POST user request from {request.host}: {request.form}')
        user = User(**request.form)
        session.add(user)
        session.commit()
        return app.response_class("User created", status=200)

@app.route('/user', methods=['GET'])
def read_users():
    with Session(engine) as session:
        logger.debug(f'GET user request from {request.host}')
        users = session.query(User).all()
        return jsonify(users)

if __name__ == '__main__':
    app.run(host=FLASK_HOST, debug = True)

