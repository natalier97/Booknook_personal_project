from django.urls import path
from .views import All_Shelves

# 'api/v1/shelves/'
urlpatterns=[
    # path("<str:shelf_name>/", A_Shelf.as_view(), name='a_shelf'),
    path("allshelves/", All_Shelves.as_view(), name='all_shelves'),
]