from django.urls import path

from .views import RepositoryListCreate, CommitList, AuthorList, RepositoryCountList

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitList.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryListCreate.as_view(),
         name='repositories-list-create'),
    path('api/repositories/count/', RepositoryCountList.as_view(),
         name='repositories-count-list'),
    path('api/authors/', AuthorList.as_view(),
         name='authors-list'),
]
