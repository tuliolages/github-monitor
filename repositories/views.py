from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit, Repository
from .serializers import AuthorSerializer, CommitSerializer, RepositorySerializer, CommitCreateSerializer
from .github_api import get_commits


class RepositoryListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    pagination_class = None

    def perform_create(self, serializer):
        repository = serializer.save(owner_id=self.request.user.id)

        latest_commits = get_commits(
            repository_name=repository.name, username=self.request.user.username)
        if latest_commits is None:
            latest_commits = []
            # TODO do somethind

        # TODO move this commit creation elsewhere and deal with commits without author and avatar
        commits = list(map(lambda entry: {
            'author': entry['author']['login'] if entry['author'] else 'unknown',
            'avatar': entry['author']['avatar_url'] if entry['author'] else '',
            'url': entry['url'],
            'sha': entry['sha'],
            'message': entry['commit']['message'],
            'date': entry['commit']['author']['date']
        }, latest_commits))
        serializer = CommitCreateSerializer(data=commits, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(repository_id=repository.id)


class CommitList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    filterset_fields = ['author', 'repository']


class AuthorList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.order_by('author').values('author').distinct()
    serializer_class = AuthorSerializer
    pagination_class = None
