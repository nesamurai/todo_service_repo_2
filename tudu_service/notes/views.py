from rest_framework.viewsets import ModelViewSet

from notes.models import Project, Tudu
from notes.serializers import ProjectSerializer, TuduSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TuduModelViewSet(ModelViewSet):
    queryset = Tudu.objects.all()
    serializer_class = TuduSerializer

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_queryset(self):
        project = self.request.query_params.get('project', '')
        todos = Tudu.objects.all()
        if project:
            todos = Tudu.objects.filter(project=project)
        return todos
