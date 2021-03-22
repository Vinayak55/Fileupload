from django.urls import path
from . import views

urlpatterns = [
    path('', views.FileView.as_view(),name='filess'),
    path('<int:pk>/', views.file_detail)
]