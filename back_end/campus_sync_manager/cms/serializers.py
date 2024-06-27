from rest_framework import serializers
from .models import Admin, Student, StudentClass, ClassSection
import bcrypt

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
        extra_kwargs = {'admin_password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('admin_password')
        admin = Admin(**validated_data)
        admin.admin_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        admin.save()
        return admin

    def update(self, instance, validated_data):
        password = validated_data.pop('admin_password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.admin_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        instance.save()
        return instance

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

# class TeacherSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Teacher
#         fields = '__all__'

class StudentClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentClass
        fields = '__all__'

class ClassSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSection
        fields = '__all__'