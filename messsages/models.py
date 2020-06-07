from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Message(models.Model):
    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    
    chat = models.ForeignKey(
        'chats.Chat',
        related_name='chat_messages',
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_messages',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.user} on {self.chat} on {self.created_at}'
