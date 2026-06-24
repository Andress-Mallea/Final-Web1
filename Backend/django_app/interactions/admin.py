from django.contrib import admin
from .models import Comment, Conversation, Favorite, Message

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'artwork', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('content', 'user__username', 'artwork__title')

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'artwork', 'created_at')
    search_fields = ('user__username', 'artwork__title')

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('participant_one', 'participant_two', 'updated_at')
    search_fields = ('participant_one__username', 'participant_two__username')

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('conversation', 'sender', 'created_at')
    search_fields = ('body', 'sender__username')