from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from .models import Admin, Student, StudentClass, ClassSection
from .serializers import AdminSerializer, StudentSerializer, StudentClassSerializer, ClassSectionSerializer
import bcrypt
from django.db import models

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        
        # admin_id = models.BigAutoField(primary_key=True)
        email = request.data.get('email')
        password = request.data.get('password')
        print(f"Email: {email}, Password: {password}")  # Debug print

        try:
            admin = Admin.objects.get(admin_email=email)
            print(f"Admin found: {admin.admin_email}")  # Debug print
        except Admin.DoesNotExist:
            print("Admin does not exist")  # Debug print
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        if not bcrypt.checkpw(password.encode('utf-8'), admin.admin_password.encode('utf-8')):
            print("Password does not match")  # Debug print
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(admin)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def current(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', "").split('Bearer ')[-1]
        if not token:
            return Response({'error': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            print(RefreshToken(token, "token"))
            payload = RefreshToken(token)
            admin_id = payload['user_id']
            admin = Admin.objects.get(admin_id=admin_id)
            serializer = AdminSerializer(admin)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['put'])
    def update_admin(self, request, pk=None):
        admin = self.get_object()
        serializer = self.get_serializer(admin, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentClassViewSet(viewsets.ModelViewSet):
    queryset = StudentClass.objects.all()
    serializer_class = StudentClassSerializer

class ClassSectionViewSet(viewsets.ModelViewSet):
    queryset = ClassSection.objects.all()
    serializer_class = ClassSectionSerializer

class AllDataViewSet(viewsets.ViewSet):
    def list(self, request):
        students = Student.objects.all()
        classes = StudentClass.objects.all()
        class_sections = ClassSection.objects.all()
        admins = Admin.objects.all()

        data = {
            'students': StudentSerializer(students, many=True).data,
            'classes': StudentClassSerializer(classes, many=True).data,
            'class_sections': ClassSectionSerializer(class_sections, many=True).data,
            'admins': AdminSerializer(admins, many=True).data,
        }
        return Response(data)
