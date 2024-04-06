from django.db import models
from user_app.models import User
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

# Create your models here.
class Book(models.Model):
    title = models.CharField()
    author = models.CharField()
    description = models.TextField()
    api_rating = models.DecimalField(null=True, max_digits=2, decimal_places=1)
    page_count = models.PositiveIntegerField()
    genre = ArrayField(models.CharField(max_length=100), size=4)
    img_url = models.CharField()
    #book_ratings --> each book can have many book_ratings


    ### arrayfield doc -- https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/fields/

class Book_rating(models.Model):
    #FK = many book_ratings for each user and book
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='book_ratings')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='book_ratings')
    rating = models.DecimalField(null=True, max_digits=2, decimal_places=1)
    date_started = models.DateField(default=timezone.now, null=True)
    date_finished = models.DateField(default=timezone.now, null=True)
    #