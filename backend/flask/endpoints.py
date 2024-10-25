from sqlalchemy import Engine
from flask import Flask, request, jsonify
from loguru import logger
from sqlalchemy.orm import Session
from models import *
import bcrypt

ENCODING = 'utf-8'

def add_endpoints(engine: Engine, app: Flask):
    @app.route('/authenticate_user', methods=['POST'])
    def authenticate_user():
        with Session(engine) as session:
            logger.debug(f'POST authenticate user request from {request.host}: {request.form}')
            logger.debug(request.form.to_dict())
            #request.form = request.get_json()
            username = request.form["name"]
            password = request.form["password"]
            user = session.query(User).filter(User.name == username).first()
            if not user:
                logger.error(f"ERROR: Cannot find user {username}")
                return app.response_class("Login failed", status=400)
            if not user.verify_password(password):
                logger.info(f"User {username} tried to login, but password was incorrect")
                return app.response_class("Login failed", status=400)
            logger.info(f"User {username} logged in")
            return app.response_class(user.name, status=200)

    ### ACCESS USERS ### 
    @app.route('/user', methods=['POST'])
    def create_user():
        with Session(engine) as session:
            logger.debug(f'POST user request from {request.host}: {request.form}')
            username = request.form["name"]
            if session.query(User).filter(User.name == username).count() > 0:
                logger.error(f"ERROR: Cannot add user {username} because it already exists. Skipping...")
                return app.response_class("User already exists", status=400)
            pwd = request.form["password"]
            salt = bcrypt.gensalt()
            pwd_encrypted = bcrypt.hashpw(bytes(pwd, ENCODING), salt)
            user = User(name=username, password=pwd_encrypted, password_salt=salt)
            session.add(user)
            session.commit()
            return app.response_class("User created", status=200)

    @app.route('/user', methods=['GET'])
    def get_all_users():
        with Session(engine) as session:
            logger.debug(f'GET user request from {request.host}')
            users = session.query(User).all()
            return jsonify(users)
    
    @app.route('/user/<name>', methods=['DELETE'])
    def delete_user(name):
        with Session(engine) as session:
            logger.debug(f'DELETE called for user {name}')
            session.query(User).filter(User.name == name).delete()
            session.commit()
            return app.response_class("Deleted", status=200)
    
    ### ACCESS PUZZLES ###
    @app.route('/puzzle', methods=['POST'])
    def create_puzzle():
        with Session(engine) as session:
            logger.debug(f'POST puzzle request from {request.host}: {request.form}')
            name = request.form["name"]
            if session.query(Puzzle).filter(Puzzle.name == name).count() > 0:
                logger.error(f"ERROR: cannot add puzzle {name} because it already exists. Skipping...")
                return app.response_class("Puzzle already exists", status=400)
            p = Puzzle(**request.form)
            session.add(p)
            session.commit()
            return app.response_class("Puzzle created", status=200)

    @app.route('/puzzle', methods=['GET'])
    def get_all_puzzles():
        with Session(engine) as session:
            logger.debug(f'GET puzzle request from {request.host}')
            puzzles = session.query(Puzzle).all()
            return jsonify(puzzles)
    
    @app.route('/puzzle/<name>', methods=['DELETE'])
    def delete_puzzle(name):
        with Session(engine) as session:
            logger.debug(f'DELETE called for puzzle {name}')
            session.query(Puzzle).filter(Puzzle.name == name).delete()
            session.commit()
            return app.response_class("Deleted", status=200)
    
    ### ACCESS PORTIONS ###
    @app.route('/portion', methods=['POST'])
    def create_portion():
        with Session(engine) as session:
            name = request.form["name"]
            if session.query(Portion).filter(Portion.name == name).count() > 0:
                logger.error(f"EROR: Cannot add portion {name} because it already exists. Skipping...")
                return app.response_class("Portion already exists", status=400)
            is_completed = request.form["is_completed"] if "is_completed" in request.form.keys() else False
            assigned_user = request.form["assigned_user_name"]
            puzzle = request.form["puzzle_name"]
            p = Portion(name=name, is_completed=is_completed, assigned_user_name=assigned_user, puzzle_name=puzzle)
            session.add(p)
            session.commit()
            return app.response_class("Portion created", status=200)