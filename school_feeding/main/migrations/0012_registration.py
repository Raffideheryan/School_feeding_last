# Generated by Django 5.0.3 on 2024-03-14 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_project_rename_teamproject_team'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(choices=[('Aragatsotn', 'Aragatsotn'), ('Ararat', 'Ararat'), ('Armavir', 'Armavir'), ('Gegharkunik', 'Gegharkunik'), ('Kotayk', 'Kotayk'), ('Lori', 'Lori'), ('Shirak', 'Shirak'), ('Syunik', 'Syunik'), ('Tavush', 'Tavush'), ('Vayots Dzor', 'Vayots Dzor'), ('Yerevan', 'Yerevan')], verbose_name='Մարզ')),
                ('town', models.CharField(max_length=100, verbose_name='Գյուղ/Քաղաք')),
                ('school_name', models.CharField(max_length=250, verbose_name='Դպրոցի անուն')),
                ('contact_person', models.CharField(max_length=50, verbose_name='Կոնտակտային անձ')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Էլեկտրոնային հասցե')),
                ('phone', models.BigIntegerField(verbose_name='Հեռախոսի համար')),
            ],
            options={
                'verbose_name': 'Գրանցում',
                'verbose_name_plural': 'Գրանցումներ',
            },
        ),
    ]
