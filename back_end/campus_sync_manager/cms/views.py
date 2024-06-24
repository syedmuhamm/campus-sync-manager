from django.shortcuts import render # type: ignore

from rest_framework import status, viewsets # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from .models import Admin, Student, StudentClass, ClassSection
from .serializers import AdminSerializer, StudentSerializer, StudentClassSerializer, ClassSectionSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            admin = Admin.objects.get(admin_email=email)
        except Admin.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not check_password(password, admin.admin_password):
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(admin)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

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

# class TeacherViewSet(viewsets.ModelViewSet):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializer

class StudentClassViewSet(viewsets.ModelViewSet):
    queryset = StudentClass.objects.all()
    serializer_class = StudentClassSerializer

class ClassSectionViewSet(viewsets.ModelViewSet):
    queryset = ClassSection.objects.all()
    serializer_class = ClassSectionSerializer

class AllDataViewSet(viewsets.ViewSet):
    def list(self, request):
        students = Student.objects.all()
        # teachers = Teacher.objects.all()
        classes = StudentClass.objects.all()
        class_sections = ClassSection.objects.all()
        admins = Admin.objects.all()
        
        data = {
            'students': StudentSerializer(students, many=True).data,
            # 'teachers': TeacherSerializer(teachers, many=True).data,
            'classes': StudentClassSerializer(classes, many=True).data,
            'class_sections': ClassSectionSerializer(class_sections, many=True).data,
            'admins': AdminSerializer(admins, many=True).data,
        }
        return Response(data)

