from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError as SqlalchemyOperationalError
from time import sleep
from loguru import logger
from endpoints import add_endpoints

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

for i in range(0, 5):
    try:
        if DROP_TABLES_ON_INIT:
            logger.info("Dropping all data")
            Base.metadata.drop_all(bind=engine, tables=[User.__table__, Puzzle.__table__, Portion.__table__])
            break
    except:
        logger.error("Database init failed. Is database initialized yet? Retrying...")
        sleep(2)

Base.metadata.create_all(engine)

add_endpoints(engine, app)

if __name__ == '__main__':
    app.run(host=FLASK_HOST, debug = True)

