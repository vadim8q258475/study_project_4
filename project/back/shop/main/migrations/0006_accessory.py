# Generated by Django 5.0.1 on 2024-02-01 06:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_remove_cloth_sizes_cloth_l_cloth_m_cloth_s_cloth_xl_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accessory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('price_with_sale', models.IntegerField(default=0)),
                ('description', models.TextField()),
                ('sale', models.IntegerField(default=0)),
                ('stock', models.IntegerField(default=0)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.collection')),
                ('photos', models.ManyToManyField(to='main.photo')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.type')),
            ],
            options={
                'verbose_name': 'Accessory',
                'verbose_name_plural': 'Accessories',
            },
        ),
    ]
