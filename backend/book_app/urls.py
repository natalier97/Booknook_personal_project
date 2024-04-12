from django.urls import path
from .views import Search_for_book, Google_books, NY_times_API

# 'api/v1/books/'
urlpatterns = [
    path("nonuser/<str:book_title_or_author>/", Google_books.as_view(), name='nonuser_booksearch'),
    path("user/<str:book_title_or_author>/", Search_for_book.as_view(), name='user_booksearch'),
    path("nytimes/", NY_times_API.as_view(), name='nytimes'),
]