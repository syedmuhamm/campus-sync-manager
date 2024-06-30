# management/models.py

from django.db import models

class Admin(models.Model):
    AdminID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    AdminEmail = models.EmailField(unique=True)
    AdminCNIC = models.CharField(max_length=15, unique=True)
    AdminPhoneNumber = models.CharField(max_length=15)
    AdminAddress = models.TextField()
    AdminStatus = models.CharField(max_length=50)
    AdminCreatedAt = models.DateTimeField(auto_now_add=True)
    Password = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"


class Student(models.Model):
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    DateOfBirth = models.DateField()
    Gender = models.CharField(max_length=10)
    FeeAmount = models.DecimalField(max_digits=10, decimal_places=2)
    FeePaid = models.DecimalField(max_digits=10, decimal_places=2)
    ClassID = models.CharField(max_length=50)
    ClassSectionID = models.CharField(max_length=50)
    StudentEmail = models.EmailField(unique=True)
    StudentPhoneNumber = models.CharField(max_length=15)
    StudentFatherName = models.CharField(max_length=100)
    StudentGuardianPhoneNumber = models.CharField(max_length=15)
    Status = models.CharField(max_length=50)
    StudentAddress = models.TextField()
    Password = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"
