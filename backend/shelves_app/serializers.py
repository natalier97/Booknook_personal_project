from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Shelves
from book_app.serializers import BookRatingSerializer, BookSerializer

class ShelvesSerializer(ModelSerializer):
    book = BookSerializer(many=True)
    class Meta:
        model = Shelves
        fields = ['id','shelf_name', 'book']

# [
#   {
#     "id": 1,
#     "shelf_name": "read",
#     "book": []
#   },
#   {
#     "id": 2,
#     "shelf_name": "want to read",
#     "book": []
#   },
#   {
#     "id": 3,
#     "shelf_name": "currently reading",
#     "book": []
#   },
#   {
#     "id": 4,
#     "shelf_name": "favorites",
#     "book": []
#   }
# ]

class AShelfSerializer(ModelSerializer):
    class Meta:
        model = Shelves
        fields = ['id', 'shelf_name']