from django.test import TestCase
from .models import Team


class TeamModelTests(TestCase):
	def test_create_team(self):
		team = Team.objects.create(name='Team Marvel')
		self.assertEqual(team.name, 'Team Marvel')
