# populate_db.py

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cms_project.settings')
django.setup()

from cms_app.models import Admin, Student

def populate_admin():
    Admin.objects.create(
        FirstName='John',
        LastName='Doe',
        AdminEmail='john.doe@example.com',
        AdminCNIC='12345-6789012-3',
        AdminPhoneNumber='1234567890',
        AdminAddress='123 Main St, City, Country',
        AdminStatus='Active',
        Password='securepassword123'
    )

    Admin.objects.create(
        FirstName='Jane',
        LastName='Smith',
        AdminEmail='jane.smith@example.com',
        AdminCNIC='98765-4321098-7',
        AdminPhoneNumber='0987654321',
        AdminAddress='456 Elm St, City, Country',
        AdminStatus='Active',
        Password='anothersecurepassword456'
    )

def populate_student():
    Student.objects.create(
        FirstName='Alice',
        LastName='Johnson',
        DateOfBirth='2000-01-01',
        Gender='Female',
        FeeAmount=5000.00,
        FeePaid=2500.00,
        ClassID='10',
        ClassSectionID='A',
        StudentEmail='alice.johnson@example.com',
        StudentPhoneNumber='1122334455',
        StudentFatherName='Robert Johnson',
        StudentGuardianPhoneNumber='6677889900',
        Status='Active',
        StudentAddress='789 Oak St, City, Country',
        Password='studentpassword123'
    )

    Student.objects.create(
        FirstName='Bob',
        LastName='Williams',
        DateOfBirth='2001-02-02',
        Gender='Male',
        FeeAmount=6000.00,
        FeePaid=6000.00,
        ClassID='11',
        ClassSectionID='B',
        StudentEmail='bob.williams@example.com',
        StudentPhoneNumber='2233445566',
        StudentFatherName='James Williams',
        StudentGuardianPhoneNumber='7788990011',
        Status='Active',
        StudentAddress='101 Pine St, City, Country',
        Password='studentpassword456'
    )

if __name__ == '__main__':
    populate_admin()
    populate_student()
    print("Database populated successfully!")
