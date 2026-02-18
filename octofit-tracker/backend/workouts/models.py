from django.db import models
from users.models import User


class Workout(models.Model):
    INTENSITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField()
    intensity = models.CharField(max_length=10, choices=INTENSITY_CHOICES)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='workouts',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
