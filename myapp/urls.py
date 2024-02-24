from django.urls import path
from . import views

urlpatterns = [
    path('', views.lambda_handler, name='lambda_handler'),
    path('/upload', views.lambda_handler, name='upload_file'),
]
