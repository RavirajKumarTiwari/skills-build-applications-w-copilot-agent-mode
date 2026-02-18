from django.test import TestCase
from teams.models import Team
from .models import User


class UserModelTests(TestCase):
	def test_create_user(self):
		team = Team.objects.create(name='Team DC')
		user = User.objects.create(username='batman', email='batman@wayne.com', team=team)
		self.assertEqual(user.username, 'batman')
