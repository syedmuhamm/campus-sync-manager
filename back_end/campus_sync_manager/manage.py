# #!/usr/bin/env python
# """Django's command-line utility for administrative tasks."""
# import os
# import sys


# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_sync_manager.settings')
#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)


# if __name__ == '__main__':
#     main()

import dotenv
import os
import sys

# Load environment variables from .env file
dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Existing imports
import django
from django.core.management import execute_from_command_line

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "campus_sync_manager.settings")
    django.setup()
    execute_from_command_line(sys.argv)
