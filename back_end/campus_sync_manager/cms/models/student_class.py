from django.db import models

class StudentClass(models.Model):
    class_id = models.AutoField(primary_key=True)
    class_name = models.CharField(max_length=100)
    total_enrolled_students = models.IntegerField()

    def __str__(self):
        return self.class_name
