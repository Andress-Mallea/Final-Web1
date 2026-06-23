from django.contrib import admin
from .models import CommissionTier, CommissionRequest

@admin.register(CommissionTier)
class CommissionTierAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'price', 'delivery_days')
    list_filter = ('artist',)
    search_fields = ('title', 'artist__username')
@admin.register(CommissionRequest)
class CommissionRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'tier', 'status', 'created_at')
    list_filter = ('(status', 'created_at')
    search_fields = ('client__username', 'tier_title')