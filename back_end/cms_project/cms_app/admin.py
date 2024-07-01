from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Admin, Student, Class, ClassSection

admin.site.register(Admin)
admin.site.register(Student)
admin.site.register(Class)
admin.site.register(ClassSection)