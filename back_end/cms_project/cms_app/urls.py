from django.urls import path
from .views import login, get_current_admin, get_all_students

urlpatterns = [
    path('login/', login, name='login'),
    # path('all_data/', get_all_data, name='all_data'),
    path('admin/current/', get_current_admin, name='current_admin'),
    path('all_students/', get_all_students, name='all_students'),

]
