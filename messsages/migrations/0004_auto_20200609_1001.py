# Generated by Django 3.0.7 on 2020-06-09 10:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0006_auto_20200609_0958'),
        ('messsages', '0003_remove_message_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='chat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat', to='chats.Chat'),
        ),
    ]
