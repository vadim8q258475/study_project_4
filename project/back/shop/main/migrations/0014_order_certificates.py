# Generated by Django 5.0.1 on 2024-02-06 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_certificate'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='certificates',
            field=models.ManyToManyField(to='main.certificate'),
        ),
    ]