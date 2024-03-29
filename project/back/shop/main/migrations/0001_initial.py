# Generated by Django 5.0.1 on 2024-01-17 05:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Cloth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('price_with_sale', models.IntegerField(default=0)),
                ('description', models.TextField()),
                ('care_recommendations', models.TextField()),
                ('sale', models.IntegerField(default=0)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.collection')),
                ('photos', models.ManyToManyField(to='main.photo')),
                ('sizes', models.ManyToManyField(to='main.size')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.type')),
            ],
        ),
    ]
