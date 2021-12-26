from rest_framework.serializers import ModelSerializer

from notes.models import Project, Tudu
from users.serializers import UserSerializer


class ProjectSerializer(ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TuduSerializer(ModelSerializer):
    project = ProjectSerializer()
    user = UserSerializer()

    class Meta:
        model = Tudu
        fields = '__all__'
