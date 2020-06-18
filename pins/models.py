from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Pin(models.Model):
    title = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    details = models.CharField(max_length=1000, blank=True)
    image = models.CharField(max_length=300, blank=True)
    link = models.CharField(max_length=300, blank=True)

    trips = models.ManyToManyField(
        'trips.Trip',
        related_name='pins',
        blank=True
    )

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_pins',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.title}'
