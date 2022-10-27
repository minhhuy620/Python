from datetime import date
import requests
from requests.exceptions import HTTPError
from requests.structures import CaseInsensitiveDict

url_open = 'https://httpbin.org/get'
url_post_open = 'https://httpbin.org/post'
url_put_open = 'https://httpbin.org/put'
url_delete_open = 'https://httpbin.org/delete'

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"
headers["Content-Type"] = "application/json"


def check_exceptions_status_http(response):
    for url in [response]:
        try:
            response.raise_for_status()
        except HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
        except Exception as err:
            print(f'Other error occurred: {err}')
        else:
            print('Success!')


def get_json():
    response = requests.get(
        url_open, headers=headers, verify=False)
    print("GET METHOD:------>", response.status_code)
    check_exceptions_status_http(response)
    json_response = response.json()
    return json_response


def post_json():
    json_data = """{"employee":{ "name":"HuyVm5", "city":"DN" }}"""
    response = requests.post(
        url_post_open, headers=headers, data=json_data, verify=False)
    print("POST METHOD:------>", response.status_code)
    check_exceptions_status_http(response)
    json_response = response.json()
    return json_response


def put_json():
    json_data = """{"employee":{ "name":"HuyVm5", "city":"DN", "active": true }}"""
    response = requests.put(url_put_open, headers=headers,
                            data=json_data, verify=False)
    print("PUT METHOD:------>", response.status_code)
    check_exceptions_status_http(response)
    json_response = response.json()
    return json_response


def delete_json():
    response = requests.delete(url_delete_open, headers=headers, verify=False)
    print("DELETE METHOD:------>", response.status_code)
    check_exceptions_status_http(response)


def execute():
    print(get_json())
    print(post_json())
    print(put_json())
    print(delete_json())


execute()
