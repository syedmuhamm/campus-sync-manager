# """
# WSGI config for campus_sync_manager project.

# It exposes the WSGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
# """

# import os

# from django.core.wsgi import get_wsgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_sync_manager.settings')

# application = get_wsgi_application()

import dotenv
import os

# Load environment variables from .env file
dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_project.settings")

application = get_wsgi_application()
