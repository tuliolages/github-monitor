from django.urls import path

from .views import RepositoryCreate, CommitList

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitList.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryCreate.as_view(),
         name='repositories-create'),
]
