from django.contrib.auth.models import User as U
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

from users.models import User
from users.views import UserModelViewSet


class TestUserModelViewSet(TestCase):

    def setUp(self):
        self.admin = U.objects.create_superuser('anton', 'anton@gb.ru', 'fqrbljrf')

    def test_get_users(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        employee = User.objects.create(username='kolyan', firstname='Nikolay',
         lastname='Terekhin', email='kolya@gb.ru', age=33)
        client = APIClient()
        client.force_authenticate(user=self.admin)
        response = client.get(f'/api/users/{employee.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_edit_employee(self):
        employee = User.objects.create(username='blondin', firstname='Nikolay',
         lastname='Baskov', email='blondin@gb.ru', age=43)
        client = APIClient()
        client.force_authenticate(user=self.admin)
        response = client.patch(f'/api/users/{employee.id}/', {'firstname': 'Maksim', 'lastname': 'Borodin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        blondin = User.objects.get(id=employee.id)
        self.assertEqual(blondin.firstname, 'Maksim')
        self.assertEqual(blondin.lastname, 'Borodin')
        client.logout()
