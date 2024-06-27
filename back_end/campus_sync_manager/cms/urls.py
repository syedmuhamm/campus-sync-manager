# cms/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, StudentViewSet, StudentClassViewSet, ClassSectionViewSet, AllDataViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'students', StudentViewSet)
router.register(r'classes', StudentClassViewSet)
router.register(r'class_sections', ClassSectionViewSet)
router.register(r'all_data', AllDataViewSet, basename='all_data')

urlpatterns = [
    path('', include(router.urls)),
    path('admins/login/', AdminViewSet.as_view({'post': 'login'})),
    path('admins/current/', AdminViewSet.as_view({'get': 'current'})),
]
