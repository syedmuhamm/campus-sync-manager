from django.db import models
from .student_class import StudentClass
from .class_section import ClassSection

class Student(models.Model):
    class Gender(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F', 'Female'
    
    class FeePaid(models.TextChoices):
        YES = 'Y', 'Yes'
        NO = 'N', 'No'
    
    class Status(models.TextChoices):
        ENABLED = 'E', 'Enabled'
        DISABLED = 'D', 'Disabled'

    student_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=Gender.choices)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2)
    fee_paid = models.CharField(max_length=1, choices=FeePaid.choices)
    student_email = models.EmailField(unique=True)
    student_father_name = models.CharField(max_length=100)
    student_address = models.CharField(max_length=255)
    student_phone_number = models.CharField(max_length=15)
    student_guardian_phone_number = models.CharField(max_length=15)
    class_id = models.ForeignKey(StudentClass, on_delete=models.CASCADE)
    class_section_id = models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    status = models.CharField(max_length=1, choices=Status.choices)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
