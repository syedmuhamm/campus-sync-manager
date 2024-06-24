from django.core.management.base import BaseCommand
from cms.models import Admin, StudentClass, ClassSection, Student
from datetime import date

class Command(BaseCommand):
    help = 'Add initial data to the database'

    def handle(self, *args, **kwargs):
        # Add data to Admin model
        Admin.objects.create(
            first_name='John',
            last_name='Doe',
            admin_email='john.doe@example.com',
            admin_password='password123',  # Remember to hash passwords in a real application
            admin_cnic='12345-6789012-3',
            admin_phone_number='1234567890',
            admin_address='123 Main St',
            admin_status='A'
        )
        Admin.objects.create(
            first_name='Jane',
            last_name='Smith',
            admin_email='jane.smith@example.com',
            admin_password='password123',
            admin_cnic='12345-6789012-4',
            admin_phone_number='0987654321',
            admin_address='456 Elm St',
            admin_status='A'
        )
        Admin.objects.create(
            first_name='Alice',
            last_name='Johnson',
            admin_email='alice.johnson@example.com',
            admin_password='password123',
            admin_cnic='12345-6789012-5',
            admin_phone_number='1122334455',
            admin_address='789 Pine St',
            admin_status='A'
        )

        # Add data to StudentClass model
        class_1 = StudentClass.objects.create(
            class_name='Grade 1',
            total_enrolled_students=30
        )
        class_2 = StudentClass.objects.create(
            class_name='Grade 2',
            total_enrolled_students=25
        )
        class_3 = StudentClass.objects.create(
            class_name='Grade 3',
            total_enrolled_students=20
        )

        # Add data to ClassSection model
        section_a = ClassSection.objects.create(
            class_section_name='Section A',
            class_section_strength=15,
            class_id=class_1
        )
        section_b = ClassSection.objects.create(
            class_section_name='Section B',
            class_section_strength=15,
            class_id=class_1
        )
        section_c = ClassSection.objects.create(
            class_section_name='Section C',
            class_section_strength=10,
            class_id=class_2
        )

        # Add data to Student model
        Student.objects.create(
            first_name='Tom',
            last_name='Hardy',
            gender='M',
            fee_amount=1000.00,
            fee_paid='Y',
            student_email='tom.hardy@example.com',
            student_father_name='Bob Hardy',
            student_address='123 Maple St',
            student_phone_number='1234567891',
            student_guardian_phone_number='9876543210',
            class_id=class_1,
            class_section_id=section_a,
            date_of_birth=date(2010, 1, 1),
            status='E'
        )
        Student.objects.create(
            first_name='Emma',
            last_name='Watson',
            gender='F',
            fee_amount=1000.00,
            fee_paid='Y',
            student_email='emma.watson@example.com',
            student_father_name='John Watson',
            student_address='456 Oak St',
            student_phone_number='1234567892',
            student_guardian_phone_number='9876543211',
            class_id=class_2,
            class_section_id=section_c,
            date_of_birth=date(2009, 5, 15),
            status='E'
        )
        Student.objects.create(
            first_name='Chris',
            last_name='Evans',
            gender='M',
            fee_amount=1000.00,
            fee_paid='Y',
            student_email='chris.evans@example.com',
            student_father_name='Robert Evans',
            student_address='789 Cedar St',
            student_phone_number='1234567893',
            student_guardian_phone_number='9876543212',
            class_id=class_3,
            class_section_id=section_c,
            date_of_birth=date(2008, 11, 20),
            status='E'
        )

        self.stdout.write(self.style.SUCCESS('Successfully added initial data'))
