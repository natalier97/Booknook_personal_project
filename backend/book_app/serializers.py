from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Book, Book_rating



class BookSerializer(ModelSerializer):

    booknook_avg_ratings = SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id','title','author','page_count','img_url','genre','api_rating', 'description', 'booknook_avg_ratings']
        #book_ratings
        #book_on_shelf

    def get_booknook_avg_ratings(self, instance):
        ratings = instance.book_ratings.all()
        if ratings:
            ser_ratings = [x.rating for x in ratings]
            result = round(sum(ser_ratings)/len(ratings), 1)
            return result
        else: 
            return None
        



class BookRatingSerializer(ModelSerializer):
    class Meta:
        model = Book_rating
        fields = ['user','book','rating','date_started','date_finished']