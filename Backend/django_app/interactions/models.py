import uuid
from django.db import models
from identity.models import User
from catalog.models import Artwork

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name ='comments')
    user =  models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
class Favorite(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE, related_name='favorited_by')
    created-at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user', 'artwork')    