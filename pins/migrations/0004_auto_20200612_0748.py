# Generated by Django 3.0.7 on 2020-06-12 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_remove_trip_users'),
        ('pins', '0003_pin_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='trips',
            field=models.ManyToManyField(blank=True, related_name='trips', to='trips.Trip'),
        ),
    ]