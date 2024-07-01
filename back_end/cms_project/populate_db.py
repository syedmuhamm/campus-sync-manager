import os
import django

# Set up Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cms_project.settings')
django.setup()

# Import necessary models after Django setup
from django.contrib.auth.models import User
from cms_app.models import Admin, Student, Class, ClassSection

def delete_existing_data():
    print("Deleting existing data...")
    User.objects.all().delete()
    Admin.objects.all().delete()
    Student.objects.all().delete()
    ClassSection.objects.all().delete()
    Class.objects.all().delete()
    print("Existing data deleted.")

def populate_class():
    class1 = Class.objects.create(
        ClassName='Class 10',
        TotalEnrolledStudents=30
    )

    class2 = Class.objects.create(
        ClassName='Class 11',
        TotalEnrolledStudents=25
    )

    return class1, class2

def populate_class_section(class1, class2):
    section1 = ClassSection.objects.create(
        ClassSectionName='Section A',
        ClassSectionStrength=15,
        ClassID=class1
    )

    section2 = ClassSection.objects.create(
        ClassSectionName='Section B',
        ClassSectionStrength=10,
        ClassID=class2
    )

    return section1, section2

def populate_admin():
    # User 1
    user1 = User.objects.create_user(
        username='JohnDoe',
        email='test1@gmail.com1',
        password='test',
        first_name='John',
        last_name='Doe'
    )
    
    Admin.objects.create(
        user=user1,
        FirstName=user1.first_name,
        LastName=user1.last_name,
        AdminEmail=user1.email,
        AdminCNIC='12345-111111-3',
        AdminPhoneNumber='1234567890',
        AdminAddress='123 Main St, City, Country',
        AdminStatus='Active',
        Password='securepassword12311'
    )

    # User 2
    user2 = User.objects.create_user(
        username='JaneSmith',
        email='test@gmail.com',
        password='test',
        first_name='Jane',
        last_name='Smith'
    )
    
    Admin.objects.create(
        user=user2,
        FirstName=user2.first_name,
        LastName=user2.last_name,
        AdminEmail=user2.email,
        AdminCNIC='98765-222222-7',
        AdminPhoneNumber='0987654321',
        AdminAddress='456 Elm St, City, Country',
        AdminStatus='Active',
        Password='anothersecurepassword4561'
    )

def populate_student(class1, class2, section1, section2):
    Student.objects.create(
        FirstName='Alice',
        LastName='Johnson',
        DateOfBirth='2000-01-01',
        Gender='Female',
        FeeAmount=5000.00,
        FeePaid=2500.00,
        ClassID=class1,
        ClassSectionID=section1,
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
        ClassID=class2,
        ClassSectionID=section2,
        StudentEmail='bob.williams@example.com',
        StudentPhoneNumber='2233445566',
        StudentFatherName='James Williams',
        StudentGuardianPhoneNumber='7788990011',
        Status='Active',
        StudentAddress='101 Pine St, City, Country',
        Password='studentpassword456'
    )

if __name__ == '__main__':
    delete_existing_data()  # Delete existing data before populating
    class1, class2 = populate_class()
    section1, section2 = populate_class_section(class1, class2)
    populate_admin()
    populate_student(class1, class2, section1, section2)
    print("Database populated successfully!")
