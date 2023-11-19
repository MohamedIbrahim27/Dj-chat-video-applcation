from django.urls import path 
from .views import *
from . import views
app_name='main'


urlpatterns = [
    path('room',views.room,name='room'),
    path('home',views.home,name='home'),
    path('getToken',views.getToken,name='getToken'),
    # path('hotel/',PropertyList.as_view(),name='property_list'),
    # path('hotel/<slug:slug>',PropertyDetail.as_view(),name='property_detail'),
    # path('create/',PropertyCreate.as_view(),name='property_create'),
    
    
    # # api
    # path('property/list',PropertyAPiList.as_view(),name='PropertyAPiList'),
    # path('property/list/<int:pk>',PropertyAPiDetail.as_view(),name='PropertyAPiDetail'),
]
