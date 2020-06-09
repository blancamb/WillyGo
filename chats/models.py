from django.db import models


class Chat(models.Model):
    club = models.OneToOneField(
    'clubs.Club',
    related_name='owner_club',
    on_delete=models.CASCADE
    )


    def __str__(self):
        return f'{self.club}´s chat'

