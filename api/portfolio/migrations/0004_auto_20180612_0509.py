# Generated by Django 2.0 on 2018-06-12 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_auto_20180612_0508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trademodel',
            name='quantity',
            field=models.FloatField(editable=False, null=True),
        ),
    ]