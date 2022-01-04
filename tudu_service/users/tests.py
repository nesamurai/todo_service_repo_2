from django.contrib.auth.models import User as U
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from users.models import User
from users.views import UserModelViewSet


class TestUserModelViewSet(TestCase):

    def test_get_users(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        admin = U.objects.create_superuser('anton', 'anton@gb.ru', 'fqrbljrf')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
