from django.urls import path

from users.views import UserModelViewSet


app_name = 'users'

urlpatterns = [
    path('', UserModelViewSet.as_view({'get': 'list'}))
]
