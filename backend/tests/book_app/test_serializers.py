from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError, DataError
from book_app.models import Book, User, Book_rating
from book_app.serializers import BookSerializer
from shelves_app.serializers import Shelves, ShelvesSerializer



class BookSerializerTestCase(TestCase):
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

    def test_booknook_avg_ratings_no_ratings(self):
            serializer = BookSerializer(instance=self.book)
            self.assertEqual(serializer.data['booknook_avg_ratings'], None)

    def test_booknook_avg_ratings_single_rating(self):
            Book_rating.objects.create(user=self.user, book=self.book, rating=4)
            serializer = BookSerializer(instance=self.book)
            self.assertEqual(serializer.data['booknook_avg_ratings'], 4)

    def test_booknook_avg_ratings_multiple_ratings(self):
            Book_rating.objects.create(user=self.user, book=self.book, rating=3)
            Book_rating.objects.create(user=self.user, book=self.book, rating=5)
            serializer = BookSerializer(instance=self.book)
            self.assertEqual(serializer.data['booknook_avg_ratings'], 4)
       