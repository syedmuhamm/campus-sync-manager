from django.db import models

class Admin(models.Model):
    class AdminStatus(models.TextChoices):
        ACTIVE = 'A', 'Active'
        INACTIVE = 'I', 'Inactive'
        PENDING = 'P', 'Pending'

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    admin_email = models.EmailField(unique=True)
    admin_password = models.CharField(max_length=255)  # Ensure to hash passwords in practice
    admin_cnic = models.CharField(max_length=15)
    admin_phone_number = models.CharField(max_length=15)
    admin_address = models.CharField(max_length=255)
    admin_created_at = models.DateTimeField(auto_now_add=True)
    admin_status = models.CharField(max_length=1, choices=AdminStatus.choices)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
