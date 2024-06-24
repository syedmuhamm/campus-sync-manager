from django.db import models
from .student_class import StudentClass

class ClassSection(models.Model):
    class_section_id = models.AutoField(primary_key=True)
    class_section_name = models.CharField(max_length=100)
    class_section_strength = models.IntegerField()
    class_id = models.ForeignKey(StudentClass, on_delete=models.CASCADE)

    def __str__(self):
        return self.class_section_name
