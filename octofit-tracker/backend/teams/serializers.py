from rest_framework import serializers
from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'
