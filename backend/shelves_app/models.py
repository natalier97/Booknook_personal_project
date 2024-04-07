from django.db import models
from book_app.models import Book, User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Shelves(models.Model):
    shelf_name = models.CharField()
    book = models.ManyToManyField(Book, related_name='book_on_shelf')
    user =  models.ForeignKey(User, related_name='user_shelf', on_delete=models.CASCADE)


    # def __str__(self):
    #     return f"{self.user.first_name}'s {self.shelf_name} bookshelf"
    
    @receiver(post_save, sender=User)
    def create_default_shelves (sender, instance, created, **kwargs):
        if created: #executes this function only for new user creations
            default_shelves = ["read", "want to read", "currently reading", "favorites"]
            for shelf_names in default_shelves:
                Shelves.objects.create(user=instance, shelf_name=shelf_names)