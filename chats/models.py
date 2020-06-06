from django.db import models


class Chat(models.Model):
    club = models.ForeignKey(
    'clubs.Club',
    related_name='club_chat',
    on_delete=models.CASCADE
    )


def __str__(self):
    return f'{self.owner}´s chat'

