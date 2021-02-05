from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Commit
from .serializers import CommitSerializer, RepositorySerializer
from .github_api import get_commits


class RepositoryCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RepositorySerializer

    def perform_create(self, serializer):
        repository = serializer.save()
        
        # TODO move this commit creation elsewhere
        commits = list(map(lambda entry: {
            'author': entry['author']['login'],
            'avatar': entry['author']['avatar_url'],
            'url': entry['url'],
            'sha': entry['sha'],
            'message': entry['commit']['message'],
            'date': entry['commit']['author']['date']
        }, get_commits(repository_name=repository.name)))

        serializer = CommitSerializer(data=commits, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(repository_id=repository.id)


class CommitList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    filterset_fields = ['author', 'repository']
