from django.contrib import admin
from .models import Category, Tag, Artwork

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'category', 'views_count', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'artist__username')
    filter_horizontal = ('tags',)