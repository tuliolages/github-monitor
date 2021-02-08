from django.urls import path

from .views import RepositoryListCreate, CommitList, AuthorList

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitList.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryListCreate.as_view(),
         name='repositories-create'),
    path('api/authors/', AuthorList.as_view(),
         name='authors-list'),
]
