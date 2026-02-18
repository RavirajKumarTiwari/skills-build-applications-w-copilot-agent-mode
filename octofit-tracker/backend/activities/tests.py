from django.test import TestCase
from teams.models import Team
from users.models import User
from .models import Activity


class ActivityModelTests(TestCase):
	def test_create_activity(self):
		team = Team.objects.create(name='Team Marvel')
		user = User.objects.create(username='ironman', email='tony@stark.com', team=team)
		activity = Activity.objects.create(
			user=user,
			activity_type='run',
			duration_minutes=30,
			distance_km=5.0,
		)
		self.assertEqual(activity.user.username, 'ironman')
