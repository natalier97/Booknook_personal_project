# Generated by Django 5.0.4 on 2024-04-09 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book_app', '0004_book_isbn'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(null=True),
        ),
    ]
