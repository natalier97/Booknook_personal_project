from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Shelves

class ShelvesSerializer(ModelSerializer):
    class Meta:
        model = Shelves
        fields = ['shelf_name']