from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (HTTP_204_NO_CONTENT, 
                                   HTTP_400_BAD_REQUEST, 
                                   HTTP_201_CREATED, HTTP_404_NOT_FOUND,
                                   HTTP_200_OK)
import requests
import re

from user_app.views import TokenReq
from book_app.serializers import Book, Book_rating, BookRatingSerializer, BookSerializer
from shelves_app.serializers import Shelves, ShelvesSerializer

from .api_calls import env, fetch_book_from_google_books_api
         ###returns --->  return (json_response.get("items")[0]['volumeInfo'].get('description'))
        


####TODO ADD HTTP RESPONSES



def search_db_for_book(book_title):
    print('SEARCH DB FOR BOOK FUNCT', book_title)
    # book = Book.objects.filter(title=book_title)

    book = Book.objects.filter(title__contains=book_title)
    if book.exists():
        ser_book = BookSerializer(book, many=True)
        return ser_book.data
    else:
        return None
   




## "nonuser/<str: book_title_or_author>/"
class Google_books(APIView):
    def get(self, request, book_title_or_author):
        #returns an object w/ all Book Model info
        book_info = fetch_book_from_google_books_api(book_title_or_author)
        
        if book_info:
            return Response([book_info], status=HTTP_200_OK)
        else:
            return Response(status=HTTP_404_NOT_FOUND)
       


## "books/user/<str: book_title_or_author>/"
class Search_for_book(APIView):
    def get(self, request, book_title_or_author):
       
        book = search_db_for_book(book_title_or_author)

        if book:
            return Response(book, status=HTTP_200_OK)
        else:
            new_book = fetch_book_from_google_books_api(book_title_or_author)            
            if new_book['img_url']:
                return Response([new_book], status=HTTP_200_OK)
            else: 
                return Response(None, status=HTTP_404_NOT_FOUND)
    


    