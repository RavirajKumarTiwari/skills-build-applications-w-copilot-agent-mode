from rest_framework import serializers
from .models import Leaderboard


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Leaderboard
        fields = '__all__'
