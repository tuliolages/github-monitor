from django.db.models import Count

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository
from .serializers import (
    AuthorSerializer, CommitSerializer,
    RepositorySerializer, CommitCreateSerializer, RepositoryCountSerializer
)
from .tasks import get_commits_task


class RepositoryListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    pagination_class = None

    def perform_create(self, serializer):
        repository = serializer.save(owner_id=self.request.user.id)

        get_commits_task.delay(
            repository_id=repository.id, username=self.request.user.username
        )

class RepositoryCountList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RepositoryCountSerializer
    queryset = Repository.objects.annotate(count=Count('commit'))
    pagination_class = None

class CommitList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommitSerializer
    filterset_fields = ['author', 'repository']

    def get_queryset(self):
        return Commit.objects.filter(repository__owner__id=self.request.user.id)

class AuthorList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.order_by('author').values('author').distinct()
    serializer_class = AuthorSerializer
    pagination_class = None
