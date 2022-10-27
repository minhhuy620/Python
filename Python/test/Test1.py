from concurrent.futures import process
from typing import Optional


def get_full_name(first_name : str, last_name: str):
    full_name = first_name.title() + " " + last_name.title()
    return full_name

# print(get_full_name("hdfgfgggggg","3"))

def get_name_with_age(name: str, age: int):
    print(type(age));
    name_with_age = name + " is this old: " + str(age)
    return name_with_age

# print(get_name_with_age("H","2"))

def process_items(items: list[str]):
    print(type(items))
    for item in items:
        print(item)

ls = [1,2,3,3,4,22,4,23]
print(process_items(ls))


def say_hi(name: Optional[str] = None):
    if name is not None:
        print(f"Hey {name}!")
    else:
        print("Hello World")
