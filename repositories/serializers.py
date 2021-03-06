from rest_framework import serializers

from .models import Commit, Repository
from .github_api import get_repository


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name', 'id')

    def validate(self, data):

        current_user = self.context['request'].user

        repository = Repository.objects.filter(
            name=data["name"],
            owner_id=current_user.id
        ).first()

        if repository is not None:
            raise serializers.ValidationError("Repository already added previously")

        repository_data = get_repository(
            repository_name=data["name"],
            username=current_user.username
        )

        if repository_data is None:
            raise serializers.ValidationError("Repository does not exist")

        return data

class RepositoryCountSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()
    
    class Meta:
        model = Repository
        fields = ('name', 'count')

class CommitSerializer(serializers.ModelSerializer):
    repository = RepositorySerializer(many=False)

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

class CommitCreateSerializer(serializers.ModelSerializer):
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

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Commit
        fields = (
            'author',
        )
