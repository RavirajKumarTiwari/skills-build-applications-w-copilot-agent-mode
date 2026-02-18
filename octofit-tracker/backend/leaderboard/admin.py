from django.contrib import admin
from .models import Leaderboard


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
	list_display = ('user', 'score', 'updated_at')
	list_filter = ('score',)
