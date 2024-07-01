from rest_framework import serializers
from .models import Admin, Student, Class, ClassSection

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class ClassSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSection
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    ClassID = ClassSerializer()
    ClassSectionID = ClassSectionSerializer()

    class Meta:
        model = Student
        fields = '__all__'
