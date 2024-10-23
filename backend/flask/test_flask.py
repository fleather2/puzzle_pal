import requests
FLASK_URL = "http://localhost:5000"

user_01 = {'name': 'freddy', 'password': 'password123'}
user_02 = {'name': 'bobby', 'password': '123123'}
user_03 = {'name': 'alice', 'password': 'asdfasdfa'}

user_url = f"{FLASK_URL}/user"
requests.post(user_url, user_01)
requests.post(user_url, user_02)
requests.post(user_url, user_03)
# print(requests.get(user_url).content.decode())
#print(requests.delete(user_url + "/" + user_01["name"]))

puzzle_url = f"{FLASK_URL}/puzzle"
puzzle_01 = {'name': 'A Hard puzzle'}
puzzle_02 = {'name': "The second hard puzzle"}
puzzle_03 = {'name': "Big Mystery Puzzle Deluxe"}
requests.post(puzzle_url, puzzle_01)
requests.post(puzzle_url, puzzle_02)
requests.post(puzzle_url, puzzle_03)


portion_url = f"{FLASK_URL}/portion"
portion_01 = {'name': "A piece", "puzzle_name": puzzle_01['name'], "assigned_user_name": user_01['name']}
requests.post(portion_url, portion_01)