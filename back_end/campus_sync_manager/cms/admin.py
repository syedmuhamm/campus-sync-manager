from django.contrib import admin
from .models import Admin, StudentClass, ClassSection, Student

admin.site.register(Admin)
admin.site.register(StudentClass)
admin.site.register(ClassSection)
admin.site.register(Student)
