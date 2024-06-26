from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(null=False, validators=[v.MinLengthValidator(2), v.MaxLengthValidator(50)])
    #book_ratings ---> each user can have many book ratings 
    #user_shelf ---> each user will have many shelves
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']
    