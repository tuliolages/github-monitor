from rest_framework import serializers

from .models import Commit, Repository
from .github_api import get_repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name',)

    def validate(self, data):

        repository = Repository.objects.filter(name=data["name"]).first()
        if repository is not None:
            raise serializers.ValidationError("Repository already added previously")

        repository_data = get_repository(repository_name=data["name"])

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
