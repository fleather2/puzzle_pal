import requests
FLASK_URL = "http://localhost:5000"

user_01 = {'name': 'freddy', 'password': '123'}
user_url = f"{FLASK_URL}/user"
requests.post(user_url, user_01)

login_info = {"name": "freddy", "password": "123"}
login_url = f"{FLASK_URL}/authenticate_user"
print(requests.post(login_url, login_info).content)

# login_info = {"name": "freddy", "password": "asdf"}
# login_url = f"{FLASK_URL}/authenticate_user"
# print(requests.post(login_url, login_info).content)