import requests
FLASK_URL = "http://localhost:5000"

user_01 = {'name': 'freddy', 'password': 'password123'}
user_02 = {'name': 'bobby', 'password': '123123'}
user_03 = {'name': 'alice', 'password': 'asdfasdfa'}

user_url = f"{FLASK_URL}/user"
print(requests.post(user_url, user_01).content)
# print(requests.get(user_url).content.decode())