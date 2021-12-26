from django.db import models

from users.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    link = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.title


class Tudu(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.summary
