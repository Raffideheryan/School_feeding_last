# Generated by Django 5.0.2 on 2024-03-10 16:58

import django.core.validators
import main.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_customuser_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.FileField(upload_to='', verbose_name='word ')),
                ('img1', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 1')),
                ('img2', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 2')),
                ('img3', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 3')),
                ('img4', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 4')),
                ('img5', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 5')),
                ('img6', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 6')),
                ('img7', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 7')),
                ('img8', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 8')),
                ('img9', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 9')),
                ('img10', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Նկար 10')),
                ('pdf', models.FileField(upload_to='', verbose_name='pdf')),
                ('video', models.FileField(upload_to='videos/', validators=[main.utils.validate_video_size, django.core.validators.FileExtensionValidator(allowed_extensions=['mp4', 'avi', 'wmv', 'mov'])], verbose_name='Video')),
                ('team_cat', models.CharField(blank=True, choices=[('5-6', '5-6 grades'), ('7-8', '7-8 grades'), ('2-teams', 'We have 2 teams of both age groups (5-6 and 7-8 grades)')], null=True, verbose_name='Խմբի տեսակ')),
                ('project_cat', models.CharField(choices=[('healthy_lifestyle', 'Game on the topic "Healthy lifestyle in a playful way”'), ('healthy_recipes', '"Tasty and Healthy: My Favorite Healthy Recipes"'), ('research', 'Research on the topic "Discovering the World of Healthy lifestyle: Our Research"'), ('social_project', 'A Social Project “My Healthy Community”')], verbose_name='Պրոեկտի տեսակ')),
                ('school_name', models.CharField(blank=True, null=True, verbose_name='Դպրոց')),
            ],
            options={
                'verbose_name': 'Ծրագիր',
                'verbose_name_plural': 'Ծրագրեր',
            },
        ),
        migrations.RenameModel(
            old_name='TeamProject',
            new_name='Team',
        ),
    ]
