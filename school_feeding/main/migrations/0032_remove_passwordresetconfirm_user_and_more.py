# Generated by Django 5.0.3 on 2024-03-30 07:27

from django.db import migrations
# Generated by Django 5.0.3 on 2024-03-30 15:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0031_project1_project2_project3_project4_delete_project'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='passwordresetconfirm',
            name='user',
        ),
        migrations.AlterModelOptions(
            name='project1',
            options={'verbose_name': 'Առողջ Ապրելակերպը խաղի ձևով', 'verbose_name_plural': 'Առողջ Ապրելակերպը խաղի ձևով'},
        ),
        migrations.AlterModelOptions(
            name='project2',
            options={'verbose_name': 'Համեղ և առողջարար, իմ սիրելի առողջարար բաղադրատոմսը', 'verbose_name_plural': 'Համեղ և առողջարար, իմ սիրելի առողջարար բաղադրատոմսը'},
        ),
        migrations.AlterModelOptions(
            name='project3',
            options={'verbose_name': 'Բացահայտելով առողջ ապրելակերպի աշխարհը․ մեր հետազոտությունը', 'verbose_name_plural': 'Բացահայտելով առողջ ապրելակերպի աշխարհը․ մեր հետազոտությունը'},
        ),
        migrations.AlterModelOptions(
            name='project4',
            options={'verbose_name': 'Իմ առողջ համայնքը', 'verbose_name_plural': 'Իմ առողջ համայնքը'},
        ),
        migrations.AlterField(
            model_name='project1',
            name='pdf',
            field=models.FileField(upload_to='pdf-ppt/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'ppt', 'pptx'])], verbose_name='PDF/PPT'),
        ),
        migrations.AlterField(
            model_name='project1',
            name='word',
            field=models.FileField(upload_to='words/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['docx', 'doc'])], verbose_name='Word'),
        ),
        migrations.AlterField(
            model_name='project2',
            name='pdf',
            field=models.FileField(upload_to='pdf-ppt/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'ppt', 'pptx'])], verbose_name='PDF/PPT'),
        ),
        migrations.AlterField(
            model_name='project2',
            name='word',
            field=models.FileField(upload_to='words/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['docx', 'doc'])], verbose_name='Word'),
        ),
        migrations.AlterField(
            model_name='project3',
            name='pdf',
            field=models.FileField(upload_to='pdf-ppt/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'ppt', 'pptx'])], verbose_name='PDF/PPT'),
        ),
        migrations.AlterField(
            model_name='project3',
            name='word',
            field=models.FileField(upload_to='words/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['docx', 'doc'])], verbose_name='Word'),
        ),
        migrations.AlterField(
            model_name='project4',
            name='pdf',
            field=models.FileField(upload_to='pdf-ppt/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'ppt', 'pptx'])], verbose_name='PDF/PPT'),
        ),
        migrations.AlterField(
            model_name='project4',
            name='word',
            field=models.FileField(upload_to='words/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['docx', 'doc'])], verbose_name='Word'),
        ),
        migrations.DeleteModel(
            name='PasswordReset',
        ),
        migrations.DeleteModel(
            name='PasswordResetConfirm',
        ),
    ]
