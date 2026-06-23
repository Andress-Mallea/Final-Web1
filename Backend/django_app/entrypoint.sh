#!/bin/sh

echo "Esperando a la base de datos PostgreSQL..."
sleep 5

echo "Configurando el módulo de Identidad..."
python manage.py makemigrations identity
python manage.py migrate identity

echo "Generando migraciones de los demás módulos..."
python manage.py makemigrations
echo "Aplicando todas las migraciones a PostgreSQL..."
python manage.py migrate

echo "Recolectando archivos estáticos para Nginx..."
python manage.py collectstatic --noinput
echo "Creando superusuario automáticamente..."
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')"

echo "Iniciando servidor de desarrollo de Django..."
exec python manage.py runserver 0.0.0.0:8000
