from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Admin, Student

admin.site.register(Admin)
admin.site.register(Student)