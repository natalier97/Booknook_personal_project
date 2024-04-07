from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError, DataError
from django.utils import timezone

from book_app.models import Book, User, Book_rating
from book_app.serializers import BookSerializer
from shelves_app.serializers import Shelves, ShelvesSerializer


# class TestModels(TestCase):
#     def test_01_BookModel_proper_input(self):

#         new_book = Book.objects.create(
#             title="Rey's Adventures",
#             author='Austin Smith',
#             description='a tale about a dog and her adventures living in wesley chapel fl. she has two cats that she likes to play with and our her sisters. their names are biscuit and anna.',
#             api_rating= 5.0,
#             page_count=123,
#             img_url='cutedog.jpg'
#         )
       
#         new_book.full_clean()
#         self.assertIsNotNone(new_book)
    

#     def test_02_UserModel_proper_input_default_shelves_created(self):
    
#         new_user = User.objects.create(
#         username='rs@cp.com',
#         email='rs@cp.com',
#         password='123',
#         first_name='Rey'
#         )
#         new_user.full_clean()
#         shelves = Shelves.objects.filter(user=new_user)

#         ser_shelves = ShelvesSerializer(shelves, many=True)
#         # print(ser_shelves.data)
    
#         self.assertEquals(ser_shelves.data, [{'shelf_name': 'read'}, {'shelf_name': 'want to read'}, {'shelf_name': 'currently reading'}, {'shelf_name': 'favorites'}])
      
class BookRatingModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
        username='rs@cp.com',
        email='rs@cp.com',
        password='123',
        first_name='Rey'
        )
        self.book = Book.objects.create(
            title="Rey's Adventures",
            author='Austin Smith',
            description='a tale about a dog and her adventures living in wesley chapel fl. she has two cats that she likes to play with and our her sisters. their names are biscuit and anna.',
            api_rating= 5.0,
            page_count=123,
            img_url='cutedog.jpg'
        )

    # def test_03_BookRatingModel_proper_input_dates_empty(self):
    #     book_rating = Book_rating.objects.create(
    #         user_id=1,
    #         book_id=1,
    #         rating=4,
    #     )
    #     ##using default value when no value is given
    #     self.assertEqual(book_rating.date_started.date(), timezone.now().date())

    def test_04_BookRatingModel_proper_input_dates_None(self):
        book_rating = Book_rating.objects.create(
            user_id=1,
            book_id=1,
            rating=4,
            date_started= None,
            date_finished=None,
        )
         ##accepts null/none as value
        self.assertIsNone(book_rating.date_started)
        self.assertIsNone(book_rating.date_finished)

 
        