from functools import wraps
from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model

def token_required(f):
    @wraps(f)
    def decorated_function(request, *args, **kwargs):
        try:
            auth = JWTAuthentication().get_header(request)
            if auth is None or 'Bearer' not in auth:
                return JsonResponse({'message': 'Token not provided'}, status=401)
            
            token = auth.split()[1]
            validated_token = JWTAuthentication().get_validated_token(token)
            user = validated_token['user']
            request.user = user
        except Exception as e:
            return JsonResponse({'message': 'Invalid token'}, status=401)
        
        return f(request, *args, **kwargs)
    return decorated_function
