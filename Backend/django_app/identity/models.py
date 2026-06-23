import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ROLE_CHOICES = [('artist', 'Artista'), ('spectator', 'Espectador')]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='spectator')
    def __str__(self):
        return self.username
class Profile(models.Model):
    id = models.UUIField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return f"Perfil de {self.user.username}"