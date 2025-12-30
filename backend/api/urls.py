from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    BlogViewSet,
    download_cv,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path('download-cv/', download_cv, name='download-cv'),
    path('', include(router.urls)),
]
