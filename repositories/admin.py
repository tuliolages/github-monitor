from django.contrib import admin

from .models import Commit, Repository


class CommitAdmin(admin.ModelAdmin):
    list_filter = ('repository',)
    list_display = ('message', 'date')

class RepositoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner')

admin.site.register(Commit, CommitAdmin)
admin.site.register(Repository, RepositoryAdmin)
