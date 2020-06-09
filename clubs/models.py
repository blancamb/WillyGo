from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Club(models.Model):
    name = models.CharField(max_length=50, unique=True)

    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='members'
    )

    def __str__(self):
        return f'{self.name}'

