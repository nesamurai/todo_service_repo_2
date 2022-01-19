import graphene
from graphene_django import DjangoObjectType

from notes.models import Project
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    # hello = graphene.String(default_value='world')
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    projects_by_title = graphene.List(ProjectType, title=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_projects_by_title(root, info, title=None):
        projects = Project.objects.all()
        if title:
            projects = projects.filter(title=title)
        return projects


schema = graphene.Schema(query=Query)
