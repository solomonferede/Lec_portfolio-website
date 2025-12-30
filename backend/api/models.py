from django.db import models
from ckeditor.fields import RichTextField

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    technologies = models.CharField(max_length=200, blank=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    featured_image = models.ImageField(upload_to='projects/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Blog(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    excerpt = models.TextField(blank=True)
    content = RichTextField()
    author = models.CharField(max_length=120, blank=True)
    cover_image = models.ImageField(upload_to='blogs/', blank=True)
    tags = models.CharField(max_length=250, blank=True, help_text="Comma-separated tags")
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Teaching(models.Model):
    course_title = models.CharField(max_length=200)
    course_code = models.CharField(max_length=50, blank=True)
    institution = models.CharField(max_length=200)
    level = models.CharField(max_length=50, blank=True, help_text="e.g., Undergraduate, Graduate")
    semester = models.CharField(max_length=50, blank=True)
    year = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return f"{self.course_title} - {self.institution}"


class ResearchInterest(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0, help_text="Order for display")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class Award(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, blank=True)
    date = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    certificate_file = models.FileField(upload_to='certificates/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title


class Publication(models.Model):
    title = models.CharField(max_length=300)
    authors = models.CharField(max_length=500, blank=True)
    journal = models.CharField(max_length=200, blank=True)
    conference = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=20, blank=True)
    doi = models.CharField(max_length=200, blank=True)
    link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return self.title


class Experience(models.Model):
    role = models.CharField(max_length=200)
    organisation = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True, help_text="Use 'Current' for ongoing positions")
    description = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True, help_text="Comma-separated or newline-separated")
    order = models.IntegerField(default=0, help_text="Order for display (higher = more recent)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-order', '-created_at']

    def __str__(self):
        return f"{self.role} - {self.organisation}"


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200, blank=True)
    start_date = models.CharField(max_length=50, blank=True)
    end_date = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0, help_text="Order for display (higher = more recent)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-order', '-created_at']

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, blank=True, help_text="e.g., Technical, Research, Teaching")
    proficiency_level = models.CharField(max_length=50, blank=True, help_text="e.g., Advanced, Intermediate")
    order = models.IntegerField(default=0, help_text="Order for display")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return self.name
