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
import logging
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer




@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # Authenticate the user
        user = authenticate(username=email, password=password)
        
        if user is not None:
            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            return JsonResponse({
                'refresh': str(refresh),
                'access': access_token,
                'message': 'Login successful',
                'status': 'success'
            })
        else:
            return JsonResponse({'message': 'Invalid credentials', 'status': 'fail'})
    return JsonResponse({'message': 'Method not allowed', 'status': 'fail'}, status=405)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_admin(request):
    # logger.debug(f"Request User: {request.user}")
    
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=401)
    
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_students(request):
    students = Student.objects.all()
    student_data = []
    for student in students:
        student_data.append({
            'FirstName': student.FirstName,
            'LastName': student.LastName,
            'DateOfBirth': student.DateOfBirth,
            'Gender': student.Gender,
            'FeeAmount': student.FeeAmount,
            'FeePaid': student.FeePaid,
            'ClassID': student.ClassID,
            'ClassSectionID': student.ClassSectionID,
            'StudentEmail': student.StudentEmail,
            'StudentPhoneNumber': student.StudentPhoneNumber,
            'StudentFatherName': student.StudentFatherName,
            'StudentGuardianPhoneNumber': student.StudentGuardianPhoneNumber,
            'Status': student.Status,
            'StudentAddress': student.StudentAddress,
        })
    return Response({'students': student_data})