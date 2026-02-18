from django.core.management.base import BaseCommand
from django.db import transaction
from users.models import User
from teams.models import Team
from activities.models import Activity
from leaderboard.models import Leaderboard
from workouts.models import Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.WARNING('Deleting old data...'))
            Workout.objects.all().delete()
            Leaderboard.objects.all().delete()
            Activity.objects.all().delete()
            User.objects.all().delete()
            Team.objects.all().delete()

            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Team Marvel')
            dc = Team.objects.create(name='Team DC')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            tony = User.objects.create(username='ironman', email='tony@stark.com', team=marvel)
            steve = User.objects.create(username='captain', email='steve@rogers.com', team=marvel)
            bruce = User.objects.create(username='hulk', email='bruce@banner.com', team=marvel)
            clark = User.objects.create(username='superman', email='clark@kent.com', team=dc)
            brucew = User.objects.create(username='batman', email='bruce@wayne.com', team=dc)
            diana = User.objects.create(username='wonderwoman', email='diana@prince.com', team=dc)

            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            Activity.objects.create(user=tony, activity_type='run', duration_minutes=30, distance_km=5)
            Activity.objects.create(user=steve, activity_type='cycle', duration_minutes=60, distance_km=20)
            Activity.objects.create(user=bruce, activity_type='swim', duration_minutes=45, distance_km=2)
            Activity.objects.create(user=clark, activity_type='run', duration_minutes=50, distance_km=10)
            Activity.objects.create(user=brucew, activity_type='cycle', duration_minutes=70, distance_km=25)
            Activity.objects.create(user=diana, activity_type='swim', duration_minutes=40, distance_km=3)

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(user=tony, score=100)
            Leaderboard.objects.create(user=steve, score=90)
            Leaderboard.objects.create(user=bruce, score=80)
            Leaderboard.objects.create(user=clark, score=110)
            Leaderboard.objects.create(user=brucew, score=95)
            Leaderboard.objects.create(user=diana, score=105)

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            Workout.objects.create(
                name='Avengers Endurance',
                description='Team Marvel circuit',
                duration_minutes=45,
                intensity='high',
                created_by=tony,
            )
            Workout.objects.create(
                name='Justice League Strength',
                description='Team DC strength session',
                duration_minutes=50,
                intensity='medium',
                created_by=clark,
            )

            self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
