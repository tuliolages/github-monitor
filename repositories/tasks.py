from githubmonitor.celery import app

from .models import Commit, Repository
from .github_api import get_commits
from .serializers import CommitCreateSerializer

@app.task
def get_commits_task(repository_id, username):
    repository = Repository.objects.get(id=repository_id)

    print('get_commits')
    latest_commits = get_commits(
        repository_name=repository.name, username=username)
    if latest_commits is None:
        latest_commits = []
        # TODO do somethind

    print('validate_commits')
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
    print('commits_done')