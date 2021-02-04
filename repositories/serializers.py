from rest_framework import serializers

from .models import Commit, Repository
from .github_api import get_repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name',)

    def validate(self, data):
        repository_data = get_repository(repository_name=data["name"])

        if repository_data.status_code != 200:
            raise serializers.ValidationError("Invalid repository")

        return data


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )
