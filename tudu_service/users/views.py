from rest_framework.mixins import UpdateModelMixin
from rest_framework.viewsets import ReadOnlyModelViewSet

from users.models import User
from users.serializers import UserSerializer, UserSerializerV2


class UserModelViewSet(UpdateModelMixin, ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerV2
        return UserSerializer
