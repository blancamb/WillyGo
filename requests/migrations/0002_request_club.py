# Generated by Django 3.0.7 on 2020-06-10 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0003_auto_20200607_1737'),
        ('requests', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='club',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='club', to='clubs.Club'),
            preserve_default=False,
        ),
    ]
