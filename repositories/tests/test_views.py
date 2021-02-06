from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory
from rest_framework import status
from unittest.mock import patch

from repositories.models import Repository, Commit
from repositories.views import RepositoryCreate


class RepositoryCreateViewTests(TestCase):
    fixtures = ['repositories_commits.json']

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.get(pk=1)
        self.view = RepositoryCreate.as_view()

    def create_fake_commits(self):
        commits = [{
            "sha": "dd0c469c1b61ec0dc7144405237ea87072a4bda2",
            "url": "https://api.github.com/repos/tuliolages/github-monitor/commits/dd0c469c1b61ec0dc7144405237ea87072a4bda2",
            "author": {
                "name": "author_1",
                "avatar_url": "http://avatar.com"
            },
            "commit": { 
                "message": "commit message 1",
                "author": { "date": "2021-02-04T01:27:12Z" }
            }
        }, {
            "sha": "ad0c469c1b61ec0dc7144405237ea87072a4bda2",
            "url": "https://api.github.com/repos/tuliolages/github-monitor/commits/ad0c469c1b61ec0dc7144405237ea87072a4bda2",
            "author": {
                "name": "author_1",
                "avatar_url": "http://avatar.com"
            },
            "commit": { 
                "message": "commit message 2",
                "author": { "date": "2021-02-04T01:57:12Z" }
            }
        }]

        return commits

    @patch('repositories.views.get_commits')
    @patch('repositories.serializers.get_repository')
    def test_valid_repository_creation(self, mock_get_repository, mock_get_commits):

        mock_get_repository.return_value = {}
        mock_get_commits.return_value = []

        new_repository = {'name': 'another-repo'}

        request = self.factory.post(
            reverse('repositories:repositories-create'),
            new_repository,
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, new_repository)

        saved_new_repository = Repository.objects.filter(
            name=new_repository['name'],
            owner=self.user
        ).first()
        self.assertIsNotNone(saved_new_repository)

    @patch('repositories.views.get_commits')
    @patch('repositories.serializers.get_repository')
    def test_valid_repository_creation_with_commits(self, mock_get_repository, mock_get_commits):

        mock_get_repository.return_value = {'aj': 1}
        mock_get_commits.return_value = self.create_fake_commits()

        new_repository = {'name': 'another-repo'}

        request = self.factory.post(
            reverse('repositories:repositories-create'),
            new_repository,
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, new_repository)

        saved_new_repository = Repository.objects.filter(
            name=new_repository['name'],
            owner=self.user
        ).first()
        self.assertIsNotNone(saved_new_repository)

        new_repository_commits = Commit.objects.filter(
            repository=saved_new_repository)
        self.assertEqual(len(new_repository_commits), 2)

    @patch('repositories.serializers.get_repository')
    def test_non_existing_repository_creation(self, mock_get_repository):

        mock_get_repository.return_value = None

        new_repository = {'name': 'another-repo'}

        request = self.factory.post(
            reverse('repositories:repositories-create'),
            new_repository,
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        saved_new_repository = Repository.objects.filter(
            name=new_repository['name'],
            owner=self.user
        ).first()
        self.assertIsNone(saved_new_repository)

    def test_already_existing_repository_creation(self):

        new_repository = {'name': 'github-monitor'}

        request = self.factory.post(
            reverse('repositories:repositories-create'),
            new_repository,
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = self.view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        repositories = Repository.objects.filter(
            name=new_repository['name'],
            owner=self.user
        )
        self.assertEqual(len(repositories), 1)
