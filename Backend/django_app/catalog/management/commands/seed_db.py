from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from catalog.models import Artwork, Category, Tag
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Puebla la base de datos con obras de arte y artistas de prueba'

    def handle(self, *args, **kwargs):
        self.stdout.write('Iniciando el sembrado de la base de datos...')
        artists_data = ['NightPixel', 'KiroSensei', 'LunaArt', 'NeonDreamer']
        artists = []
        for username in artists_data:
            user, created = User.objects.get_or_create(
                username=username,
                defaults={'email': f'{username.lower()}@example.com'}
            )
            if created:
                user.set_password('testpass123')
                user.save()
            artists.append(user)
        cat_digital, _ = Category.objects.get_or_create(name='Arte Digital')
        tags = ['cyberpunk', 'fantasy', 'landscape', 'portrait', 'concept-art', 'anime']
        db_tags = [Tag.objects.get_or_create(name=t)[0] for t in tags]
        artworks_data = [
            {'title': 'Ciudad de Neón', 'img': 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Guerrera del Bosque', 'img': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Montañas Místicas', 'img': 'https://images.unsplash.com/photo-1506744626753-143d68c22bb7?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Retrato Cibernético', 'img': 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=600&auto=format&fit=crop'},
            {'title': 'El Último Castillo', 'img': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Viajero del Espacio', 'img': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Ruinas Antiguas', 'img': 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop'},
            {'title': 'Amanecer en Marte', 'img': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop'},
        ]

        for data in artworks_data:
            artwork, created = Artwork.objects.get_or_create(
                title=data['title'],
                defaults={
                    'artist': random.choice(artists),
                    'category': cat_digital,
                    'image_url': data['img'],
                    'views_count': random.randint(100, 5000)
                }
            )
            if created:
                artwork.tags.set(random.sample(db_tags, 2))

        self.stdout.write(self.style.SUCCESS('¡Base de datos sembrada con éxito! Revisa tu Frontend.'))