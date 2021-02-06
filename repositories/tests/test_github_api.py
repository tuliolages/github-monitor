from django.test import TestCase

from rest_framework import status
from unittest.mock import patch

from repositories.github_api import get_commits, get_repository

class RepositoryCreateViewTests(TestCase):
    fixtures = ['repositories_commits.json']

    @patch('repositories.github_api.requests')
    def test_get_existing_repository(self, mock_requests):
        mock_requests.get.return_value.status_code = 200
        mock_requests.get.return_value.data = {}

        response_data = get_repository("repository", "author")

        self.assertIsNotNone(response_data)
        

    @patch('repositories.github_api.requests')
    def test_get_invalid_repository(self, mock_requests):
        mock_requests.get.return_value.status_code = 401

        response_data = get_repository("repository", "author")

        self.assertIsNone(response_data)

    @patch('repositories.github_api.requests')
    def test_get_repository_commits(self, mock_requests):
        mock_requests.get.return_value.status_code = 200
        mock_requests.get.return_value.data = []

        response_data = get_commits("repository", "author")

        self.assertIsNotNone(response_data)

    @patch('repositories.github_api.requests')
    def test_get_repository_commits_with_error(self, mock_requests):
        mock_requests.get.return_value.status_code = 401

        response_data = get_commits("repository", "author")

        self.assertIsNone(response_data)
