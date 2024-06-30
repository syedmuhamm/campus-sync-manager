# Generated by Django 5.0.6 on 2024-06-30 16:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('DateOfBirth', models.DateField()),
                ('Gender', models.CharField(max_length=10)),
                ('FeeAmount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('FeePaid', models.DecimalField(decimal_places=2, max_digits=10)),
                ('ClassID', models.CharField(max_length=50)),
                ('ClassSectionID', models.CharField(max_length=50)),
                ('StudentEmail', models.EmailField(max_length=254)),
                ('StudentPhoneNumber', models.CharField(max_length=15)),
                ('StudentFatherName', models.CharField(max_length=100)),
                ('StudentGuardianPhoneNumber', models.CharField(max_length=15)),
                ('Status', models.CharField(max_length=50)),
                ('StudentAddress', models.TextField()),
                ('Password', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('AdminID', models.AutoField(primary_key=True, serialize=False)),
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('AdminEmail', models.EmailField(max_length=254)),
                ('AdminCNIC', models.CharField(max_length=15)),
                ('AdminPhoneNumber', models.CharField(max_length=15)),
                ('AdminAddress', models.TextField()),
                ('AdminStatus', models.CharField(max_length=50)),
                ('AdminCreatedAt', models.DateTimeField(auto_now_add=True)),
                ('Password', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
