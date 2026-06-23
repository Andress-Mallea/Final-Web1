set -e
echo "Esperando a la base de datos PostgreSQL..."
sleep 5
echo "Aplicando migraciones a la base de datos..."
python manage.py makemigrations
python manage.py migrate
echo "Recolectando archivos estáticos (para que el panel admin se vea bien)..."
python manage.py collectstatic --noinput
echo "Iniciando servidor de Django (Panel Admin)..."
exec "$@"