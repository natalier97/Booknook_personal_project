from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (HTTP_204_NO_CONTENT, 
                                   HTTP_400_BAD_REQUEST, 
                                   HTTP_201_CREATED, HTTP_404_NOT_FOUND,
                                   HTTP_200_OK, HTTP_401_UNAUTHORIZED)
import requests
import re

from user_app.views import TokenReq, User
from book_app.serializers import Book, Book_rating, BookRatingSerializer, BookSerializer
from shelves_app.serializers import Shelves, ShelvesSerializer, AShelfSerializer

# Create your views here.



# 'api/v1/shelves/allshelves/'
class All_Shelves(TokenReq):
    ## view all shelf names
    def get(self, request):
        book_user = request.user ##user email/username
        print("DJ-book user:", book_user)
        all_shelves = Shelves.objects.filter(user = book_user)
        if all_shelves.exists():
            ser_shelves = ShelvesSerializer(all_shelves, many=True) #['id','shelf_name', 'book']
            # print('DJ- THESE ARE ALL THE SHELVES', ser_shelves.data)
            return Response(ser_shelves.data, status=HTTP_200_OK)
            ##ser_shelves.data == [{}, {}, {}]
        else:
            return Response({'error': 'no shelves'}, status=HTTP_400_BAD_REQUEST)
    

    ##create a new shelf
    def post(self, request): 
        ##request coming in will have: 'shelf_name' && 'user' bc tokenReq
        data = request.data.copy()
        data['user'] = request.data.user.id
        ser_shelf = AShelfSerializer(data=data) #['id', 'shelf_name']
        if ser_shelf.is_valid():
            ser_shelf.save()
            return Response(ser_shelf.data, status=HTTP_201_CREATED)
        else:
            print(ser_shelf.errrors)
            return Response(ser_shelf.errors, status=HTTP_400_BAD_REQUEST)

    ##update shelf name?
    #def put(self, request):

    


# 'api/v1/shelves/<str:shelf_name>/'
class A_Shelf(TokenReq):
    ##view shelf
    def get(self, request, shelf_name):
        book_user = request.user
        a_shelf = Shelves.objects.filter(user = book_user, shelf_name = shelf_name)
        if a_shelf.exists():
            ser_shelf = ShelvesSerializer(a_shelf, many=True)
            print('DJ- THIS IS THE SHELF', ser_shelf.data)
            return Response([ser_shelf.data], status=HTTP_200_OK)
        else:
            return Response({'error': 'no shelf with that name'}, status=HTTP_400_BAD_REQUEST)

    #add or delete book  to shelf
    def post(self, request, shelf_name):
        # {"action": 'add' / 'remove', 'book':{book info} }

        data = request.data.copy()
        print("post-add/remove book", data['action'], data['book'])

        data['user'] = request.user.id
        book_user = request.user
        a_shelf = Shelves.objects.get(user = book_user, shelf_name = shelf_name)
       
        ####checking to see if book is already in database/on a shelf, should have an ID if so
        book_info = data['book'] 
        db_book_id = book_info.get('id') # --> should return None or id value

        ##checking to see if book in db or need to create A NEW BOOK INSTANCE
        if db_book_id:
            book = Book.objects.get(id = db_book_id)
        else:
            book = Book.objects.create(**book_info) #data = book_info, partial=True


        ##adding or removing
        if data["action"] == "add":
            a_shelf.book.add(book)
            return Response({"message": "Book added to shelf successfully"}, status=HTTP_200_OK)
        elif data["action"] == "remove": ##== "remove"
            a_shelf.book.remove(book)
            return Response({"message": "Book removed from shelf successfully"}, status=HTTP_200_OK)
        else:
            return Response({"error": "Invalid action or no action specified"}, status=HTTP_400_BAD_REQUEST)


    ##delete shelf
    def delete(self, request, shelf_name):
        pass




    