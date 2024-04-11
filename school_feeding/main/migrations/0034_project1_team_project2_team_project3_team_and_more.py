# Generated by Django 5.0.3 on 2024-03-31 09:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0033_project3_pdf_only'),
    ]

    operations = [
        migrations.AddField(
            model_name='project1',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.team', verbose_name='Թիմ'),
        ),
        migrations.AddField(
            model_name='project2',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.team', verbose_name='Թիմ'),
        ),
        migrations.AddField(
            model_name='project3',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.team', verbose_name='Թիմ'),
        ),
        migrations.AddField(
            model_name='project4',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.team', verbose_name='Թիմ'),
        ),
    ]
