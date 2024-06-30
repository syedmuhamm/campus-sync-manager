# management/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Admin, Student
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from .decorators import token_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
import json

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        admin = Admin.objects.filter(AdminEmail=email, Password=password).first()
        if admin:
            # Here, instead of a dummy token, you would generate a real token
            return JsonResponse({'access': 'dummy-access-token', 'message': 'Login successful', 'status': 'success'})
        else:
            return JsonResponse({'message': 'Invalid credentials', 'status': 'fail'})
    return JsonResponse({'message': 'Method not allowed', 'status': 'fail'}, status=405)

def get_all_students(request):
    if request.method == 'GET':
        students = list(Student.objects.values())
        return JsonResponse(students, safe=False)
    return JsonResponse({'message': 'Method not allowed', 'status': 'fail'}, status=405)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_admin(request):
    user = request.user
    try:
        admin = Admin.objects.get(user=user)
    except Admin.DoesNotExist:
        return Response({"error": "Admin not found"}, status=404)
    
    return Response({
        'AdminID': admin.AdminID,
        'FirstName': admin.FirstName,
        'LastName': admin.LastName,
        'AdminEmail': admin.AdminEmail,
        'AdminCNIC': admin.AdminCNIC,
        'AdminPhoneNumber': admin.AdminPhoneNumber,
        'AdminAddress': admin.AdminAddress,
        'AdminStatus': admin.AdminStatus,
        'AdminCreatedAt': admin.AdminCreatedAt
    })
# @login_required
# @require_http_methods(["GET"])
# def get_current_admin(request):
#     if request.method == 'GET':
#         admin = request.user  # Assuming Admin is the custom user model
#         admin_data = {
#             'AdminID': admin.id,
#             'FirstName': admin.first_name,
#             'LastName': admin.last_name,
#             'AdminEmail': admin.email,
#             'AdminCNIC': admin.cnic,
#             'AdminPhoneNumber': admin.phone_number,
#             'AdminAddress': admin.address,
#             'AdminStatus': admin.status,
#             'AdminCreatedAt': admin.created_at,
#         }
#         return JsonResponse(admin_data)
#     return JsonResponse({'message': 'Method not allowed'}, status=405)

@login_required
@require_http_methods(["GET"])
def get_all_students(request):
    if request.method == 'GET':
        students = Student.objects.all()
        student_data = []
        for student in students:
            student_data.append({
                'FirstName': student.first_name,
                'LastName': student.last_name,
                'DateOfBirth': student.date_of_birth,
                'Gender': student.gender,
                'FeeAmount': student.fee_amount,
                'FeePaid': student.fee_paid,
                'ClassID': student.class_id,
                'ClassSectionID': student.class_section_id,
                'StudentEmail': student.email,
                'StudentPhoneNumber': student.phone_number,
                'StudentFatherName': student.father_name,
                'StudentGuardianPhoneNumber': student.guardian_phone_number,
                'Status': student.status,
                'StudentAddress': student.address,
            })
        return JsonResponse({'students': student_data})
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)
