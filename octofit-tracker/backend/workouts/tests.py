from django.test import TestCase
from teams.models import Team
from users.models import User
from .models import Workout


class WorkoutModelTests(TestCase):
    def test_create_workout(self):
        team = Team.objects.create(name='Team Test')
        user = User.objects.create(username='trainer', email='trainer@example.com', team=team)
        workout = Workout.objects.create(
            name='Hero Circuit',
            description='High intensity circuit',
            duration_minutes=45,
            intensity='high',
            created_by=user,
        )
        self.assertEqual(workout.name, 'Hero Circuit')
