from django.db import models


class Trip(models.Model):
    name = models.CharField(max_length=100)
    
    owner = models.ForeignKey(
        'clubs.Club',
        related_name='created_trips',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.name}'