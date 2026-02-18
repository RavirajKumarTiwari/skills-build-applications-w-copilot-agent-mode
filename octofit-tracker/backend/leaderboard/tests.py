from django.test import TestCase
from teams.models import Team
from users.models import User
from .models import Leaderboard


class LeaderboardModelTests(TestCase):
	def test_create_leaderboard_entry(self):
		team = Team.objects.create(name='Team DC')
		user = User.objects.create(username='superman', email='clark@kent.com', team=team)
		entry = Leaderboard.objects.create(user=user, score=120)
		self.assertEqual(entry.score, 120)
