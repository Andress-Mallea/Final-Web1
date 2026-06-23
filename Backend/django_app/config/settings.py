import os
from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR.parent, '.env'))

SECRET_KEY = env('DJANGO_SECRET_KEY', default='super-secret-key-para-desarrollo')
DEBUG = env.bool('DJANGO_DEBUG', default=True)
ALLOWED_HOST = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sessions',
    'django.contrib.mesagges',
    'django.contrib.staticfiles',
    
    'identity',
    'catalog',
    'interactions',
    'business',
]

AUTH_USER_MODEL = 'identity.User'
DATABASES = {
    'default': env.db('DATABASE_URL', default='postgres://postgres:postgres@db:5432/deviantart_db')
}

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'