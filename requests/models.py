from django.db import models
from clubs.models import Club
from django.contrib.auth import get_user_model

User = get_user_model()

class Request(models.Model):
    message = models.CharField(max_length=150)
    
    sender = models.ForeignKey(
        'jwt_auth.User',
        related_name='sent_requests',
        on_delete=models.CASCADE
    )

    recipient = models.ForeignKey(
        'jwt_auth.User',        
        related_name='requests_inbox',
        on_delete=models.CASCADE
    )

    club = models.OneToOneField(
        'clubs.Club',
        related_name='club',
        on_delete=models.CASCADE
    )


    def __str__(self):
        return f'{self.sender} to {self.recipient}'