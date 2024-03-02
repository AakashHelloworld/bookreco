import pandas as pd 
import numpy as np

df = pd.read_csv('filtered_data1.csv', encoding='latin-1')

def get_info(title):
    book_arr = df[df['Book-Title'] == title].values
    return book_arr

def get_isbn(title):
    book_arr = get_info(title)
    return book_arr[0][1]

def get_auth(title):
    book_arr = get_info(title)
    return book_arr[0][2]

def get_year(title):
    book_arr = get_info(title)
    return book_arr[0][3]

def get_rating(title):
    book_arr = get_info(title)
    return book_arr[0][4]

def get_desc(title):
    book_arr = get_info(title)
    return book_arr[0][5]

def get_pg(title):
    book_arr = get_info(title)
    return book_arr[0][6]

def get_publisher(title):
    book_arr = get_info(title)
    return book_arr[0][7]

def get_img(title):
    book_arr = get_info(title)
    return book_arr[0][9]

