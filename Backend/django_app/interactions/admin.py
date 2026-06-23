from django.contrib import admin
from .models import Comment, Favorite

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'artwork', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('content', 'user__username', 'artwork__title')

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'artwork', 'created_at')
    search_fields = ('user__username', 'artwork__title')
