from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, StudentViewSet, StudentClassViewSet, ClassSectionViewSet, AllDataViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'students', StudentViewSet)
# router.register(r'teachers', TeacherViewSet)
router.register(r'classes', StudentClassViewSet)
router.register(r'class_sections', ClassSectionViewSet)
router.register(r'all_data', AllDataViewSet, basename='all_data')

urlpatterns = [
    path('', include(router.urls)),
]
