import uuid
from django.db import models
from identity.models import User

class CommissionTier(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    artist = models.ForeignKey(User, on_delete=models.CASCADE, realted_name='comission_tiers')
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    delivey_days = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.title} - ${self.price}"
class CommisionRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('accepted', 'Aceptado'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completado'),
        ('rejected', 'Rechazado')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requested_commissions')
    tier = models.ForeignKey(CommissionTier, on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    instructions = models.TextField() 
    created_at = models.DateTimeField(auto_now_add=True)
    