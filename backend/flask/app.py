from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError as SqlalchemyOperationalError
from time import sleep

from models import * 
FLASK_HOST = "localhost"

app = Flask(__name__)
CORS(app)

if __name__ == '__main__':
    app.run(host=FLASK_HOST, debug = True)

