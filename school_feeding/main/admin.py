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
    VotableItem,
    Vote,
    Vote2,
    Vote3,
    Vote4
)

#changes

#admin.site.register(VotableItem, VotableAdmin)

@admin.register(VotableItem)
class VoteItemAdmin(admin.ModelAdmin):
    list_display = ["school_name", "video", "vote_count"]
    list_filter = ["school_name","video", "vote_count"]
    search_fields = ["school_name", "video"]
    ordering = ["school_name"]

@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ["user", "item"]
    list_filter = ["user","item"]
    search_fields = ["user", "item"]
    ordering = ["user"]

@admin.register(Vote2)
class VoteAdmin2(admin.ModelAdmin):
    list_display = ["user", "item"]
    list_filter = ["user","item"]
    search_fields = ["user", "item"]
    ordering = ["user"]


@admin.register(Vote3)
class VoteAdmin3(admin.ModelAdmin):
    list_display = ["user", "item"]
    list_filter = ["user","item"]
    search_fields = ["user", "item"]
    ordering = ["user"]


@admin.register(Vote4)
class VoteAdmin4(admin.ModelAdmin):
    list_display = ["user", "item"]
    list_filter = ["user","item"]
    search_fields = ["user", "item"]
    ordering = ["user"]



# class TeamAdmin(admin.ModelAdmin):
#     list_display = ["email", "school_name", "project_cat", "team_cat"]
#     list_display_links = ["email", "school_name", "project_cat", "team_cat"]
class ProjectAdmin1(admin.ModelAdmin):
    list_display = ["id", "user", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","user", "name1", "name2", "name3", "name4"]






class ProjectAdmin2(admin.ModelAdmin):
    list_display = ["id", "user", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","user", "name1", "name2", "name3", "name4"]


class ProjectAdmin3(admin.ModelAdmin):
    list_display = ["id", "user", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","user", "name1", "name2", "name3", "name4"]


class ProjectAdmin4(admin.ModelAdmin):
    list_display = ["id", "user", "name1", "name2", "name3", "name4"]
    list_display_links = ["id","user", "name1", "name2", "name3", "name4"]


class RegistrationAdmin(admin.ModelAdmin):
    list_display = ["contact_person", "school_name", "email", "phone"]
    list_display_links = ["contact_person"]


class MessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone"]
    list_display_links = ["name"]


@admin.register(CustomUser)
class PostAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "phone"]
    list_filter = ["username", "phone", "email"]
    search_fields = ["username", "email"]
    ordering = ["phone"]


@admin.register(ApplicationForm)
class AppAdmin(admin.ModelAdmin):
    list_display = ["contact_person", "email", "phone", "age_cat", "project_cat1","project_cat2", "project_cat3", "project_cat4"]
    list_filter = ["contact_person", "age_cat", "project_cat1","project_cat2", "project_cat3", "project_cat4"]
    search_fields = ["contact_person", "email", "age_cat", "project_cat1","project_cat2", "project_cat3", "project_cat4"]
    ordering = ["phone"]


# admin.site.register(Team, TeamAdmin)
admin.site.register(Project1, ProjectAdmin2)
admin.site.register(Project2, ProjectAdmin2)
admin.site.register(Project3, ProjectAdmin3)
admin.site.register(Project4, ProjectAdmin4)
admin.site.register(Registration, RegistrationAdmin)
admin.site.register(Message, MessageAdmin)
