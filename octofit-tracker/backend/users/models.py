from django.db import models
from teams.models import Team


class User(models.Model):
	username = models.CharField(max_length=50, unique=True)
	email = models.EmailField(unique=True)
	team = models.ForeignKey(
		Team,
		on_delete=models.SET_NULL,
		null=True,
		blank=True,
		related_name='members',
	)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.username
