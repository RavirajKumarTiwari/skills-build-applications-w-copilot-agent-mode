from rest_framework.routers import DefaultRouter
from .views import LeaderboardViewSet

router = DefaultRouter()
router.register(r'leaderboard', LeaderboardViewSet)

urlpatterns = router.urls
