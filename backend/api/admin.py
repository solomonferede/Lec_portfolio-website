from django.contrib import admin
from .models import (
    Project, Blog, Teaching, ResearchInterest, Award,
    Publication, Experience, Education, Skill
)
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "created_at")
    search_fields = ("title", "technologies")
    list_filter = ("is_featured", "created_at")


class BlogAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Blog
        fields = '__all__'

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    form = BlogAdminForm
    list_display = ("title", "slug", "published_at", "created_at")
    search_fields = ("title", "slug", "tags", "author")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Teaching)
class TeachingAdmin(admin.ModelAdmin):
    list_display = ("course_title", "course_code", "institution", "year", "semester")
    search_fields = ("course_title", "course_code", "institution")
    list_filter = ("institution", "level", "year")


@admin.register(ResearchInterest)
class ResearchInterestAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "created_at")
    search_fields = ("title", "description")
    list_editable = ("order",)


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "date", "created_at")
    search_fields = ("title", "issuer", "description")
    list_filter = ("date", "created_at")


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ("title", "journal", "conference", "year", "is_featured")
    search_fields = ("title", "authors", "journal", "conference")
    list_filter = ("is_featured", "year", "created_at")
    list_editable = ("is_featured",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "organisation", "start_date", "end_date", "order")
    search_fields = ("role", "organisation", "location")
    list_filter = ("organisation", "created_at")
    list_editable = ("order",)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_date", "end_date", "order")
    search_fields = ("degree", "institution", "field_of_study")
    list_filter = ("institution", "created_at")
    list_editable = ("order",)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency_level", "order")
    search_fields = ("name", "category")
    list_filter = ("category", "proficiency_level")
    list_editable = ("order",)
