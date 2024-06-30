# management/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Admin, Student
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
