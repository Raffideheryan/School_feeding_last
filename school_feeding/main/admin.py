from django.contrib import admin

from .models import (
    ApplicationForm,
    CustomUser,
    Message,
    Project1,
    Project2,
    Project3,
    Project4,
    Registration,
    Team,
)


# class TeamAdmin(admin.ModelAdmin):
#     list_display = ["email", "school_name", "project_cat", "team_cat"]
#     list_display_links = ["email", "school_name", "project_cat", "team_cat"]


class ProjectAdmin1(admin.ModelAdmin):
    list_display = ["id", "team", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","team", "name1", "name2", "name3", "name4"]



class ProjectAdmin2(admin.ModelAdmin):
    list_display = ["id", "team", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","team", "name1", "name2", "name3", "name4"]


class ProjectAdmin3(admin.ModelAdmin):
    list_display = ["id", "team", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","team", "name1", "name2", "name3", "name4"]


class ProjectAdmin4(admin.ModelAdmin):
    list_display = ["id", "team", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","team", "name1", "name2", "name3", "name4"]


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ["contact_person", "school_name", "email", "phone"]
    list_display_links = ["contact_person"]


class MessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "message"]
    list_display_links = ["name"]


@admin.register(CustomUser)
class PostAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "phone"]
    list_filter = ["username", "phone", "email"]
    search_fields = ["username", "email"]
    ordering = ["phone"]


@admin.register(ApplicationForm)
class AppAdmin(admin.ModelAdmin):
    list_display = ["contact_person", "email", "phone", "age_cat", "project_cat1"]
    list_filter = ["contact_person", "age_cat", "project_cat1"]
    search_fields = ["contact_person", "email", "age_cat", "project_cat1"]
    ordering = ["phone"]


# admin.site.register(Team, TeamAdmin)
admin.site.register(Project1, ProjectAdmin1)
admin.site.register(Project2, ProjectAdmin2)
admin.site.register(Project3, ProjectAdmin3)
admin.site.register(Project4, ProjectAdmin4)
admin.site.register(Registration, RegistrationAdmin)
admin.site.register(Message, MessageAdmin)
