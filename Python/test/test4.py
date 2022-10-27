import requests
from requests.structures import CaseInsensitiveDict

url = "https://reqbin.com/echo/get/json"

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"
headers["Authorization"] = "Basic aHV5dm01OjEyMzEyMw=="


resp = requests.get(url, headers=headers, verify= False)

print(resp.status_code)

