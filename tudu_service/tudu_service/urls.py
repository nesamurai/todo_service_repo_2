"""tudu_service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView

from notes.views import ProjectModelViewSet, TuduModelViewSet
from users.views import UserModelViewSet


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TuduModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Tudu_API',
        default_version='v1',
        description='Documentation for project',
        contact=openapi.Contact(email='admin@gb_test.ru'),
        license=openapi.License(name='MIT License')
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/', include(router.urls)),
    path('api/v1/users/', include('users.urls', namespace='v1')),
    path('api/v2/users/', include('users.urls', namespace='v2')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('graphql/', GraphQLView.as_view(graphiql=True))
]
