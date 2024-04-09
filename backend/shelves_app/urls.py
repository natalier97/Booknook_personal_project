from django.urls import path
from .views import All_Shelves, A_Shelf

# 'api/v1/shelves/'
urlpatterns=[
    path("allshelves/", All_Shelves.as_view(), name='all_shelves'),
    path("<str:shelf_name>/", A_Shelf.as_view(), name='a_shelf'),
]