from rest_framework.serializers import ModelSerializer

from users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email']


class UserSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'age']
