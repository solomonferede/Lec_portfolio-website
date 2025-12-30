from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    BlogViewSet,
    TeachingViewSet,
    ResearchInterestViewSet,
    AwardViewSet,
    PublicationViewSet,
    ExperienceViewSet,
    EducationViewSet,
    SkillViewSet,
    download_cv,
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'teaching', TeachingViewSet, basename='teaching')
router.register(r'research-interests', ResearchInterestViewSet, basename='research-interest')
router.register(r'awards', AwardViewSet, basename='award')
router.register(r'publications', PublicationViewSet, basename='publication')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'skills', SkillViewSet, basename='skill')

urlpatterns = [
    path('download-cv/', download_cv, name='download-cv'),
    path('', include(router.urls)),
]
