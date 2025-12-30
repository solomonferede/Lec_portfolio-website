from django.http import FileResponse
from rest_framework import viewsets
from django.conf import settings
import os


def download_cv(request):
    cv_path = os.path.join(settings.MEDIA_ROOT, 'CV.pdf')
    response = FileResponse(open(cv_path, 'rb'), as_attachment=True, filename='Solomon-Ferede-CV.pdf')
    return response


from .models import Project, Blog
from .serializers import (
    ProjectSerializer,
    BlogSerializer,
)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all().order_by('-created_at')
        if self.request.query_params.get('featured') == 'true':
            return queryset.filter(is_featured=True)[:3]
        return queryset


class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogSerializer

    def get_queryset(self):
        queryset = Blog.objects.all().order_by('-published_at', '-created_at')
        limit = self.request.query_params.get('limit')
        if limit:
            return queryset[:int(limit)]
        return queryset
