from flask import Flask
import pandas as pd
import pickle
import numpy as np


app = Flask(__name__)

popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl','rb'))
# print(type(pt))
books = pickle.load(open('books.pkl','rb'))
# print(type(books))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))

size = 10


@app.route("/popular/<page_number>")
def popular(    page_number):
    # print(page_number)
    
    list_popular = popular_df[size*(int(page_number)-1) : size*int(page_number)].values.tolist()

    # print(list_popular)
    return list_popular


def recommend_book(book_name):
    # index fetch
    index = np.where(pt.index==book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        
        data.append(item)
    
    return data

# print(recommend_book("Animal Farm"))

@app.route("/books-recommended/<book_name>")
def recommended(book_name):
    # print(pt.index, pt)
    print(type(book_name))
    print(book_name)
    index = np.where(pt.index == "Clara Callan")[0][0]
    # print(index)
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:5]
    
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        
        data.append(item)

    return data







if __name__ == "__main__":
    app.run( debug=True)