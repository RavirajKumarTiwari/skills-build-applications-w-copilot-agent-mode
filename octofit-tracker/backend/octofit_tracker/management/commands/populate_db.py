from django.core.management.base import BaseCommand
from users.models import User
from teams.models import Team
from activities.models import Activity
from leaderboard.models import Leaderboard
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.WARNING('Deleting old data...'))
            User.objects.all().delete()
            Team.objects.all().delete()
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()

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
            Activity.objects.create(user=tony, type='run', duration=30, distance=5)
            Activity.objects.create(user=steve, type='cycle', duration=60, distance=20)
            Activity.objects.create(user=bruce, type='swim', duration=45, distance=2)
            Activity.objects.create(user=clark, type='run', duration=50, distance=10)
            Activity.objects.create(user=brucew, type='cycle', duration=70, distance=25)
            Activity.objects.create(user=diana, type='swim', duration=40, distance=3)

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(user=tony, score=100)
            Leaderboard.objects.create(user=steve, score=90)
            Leaderboard.objects.create(user=bruce, score=80)
            Leaderboard.objects.create(user=clark, score=110)
            Leaderboard.objects.create(user=brucew, score=95)
            Leaderboard.objects.create(user=diana, score=105)

            self.stdout.write(self.style.SUCCESS('Database populated with test data!'))

            # Ensure unique index on email
            from django.conf import settings
            from pymongo import ASCENDING
            db = settings.DATABASES['default']['NAME']
            from djongo import connection
            connection.cursor().db_conn["users_user"].create_index([("email", ASCENDING)], unique=True)
            self.stdout.write(self.style.SUCCESS('Unique index on email created for users!'))
