from django.db import models
from users.models import User


class Activity(models.Model):
	ACTIVITY_CHOICES = [
		('run', 'Run'),
		('cycle', 'Cycle'),
		('swim', 'Swim'),
		('strength', 'Strength'),
	]

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
	activity_type = models.CharField(max_length=30, choices=ACTIVITY_CHOICES)
	duration_minutes = models.PositiveIntegerField()
	distance_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
	performed_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.user.username} - {self.activity_type}"
