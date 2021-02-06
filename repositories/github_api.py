import datetime
import requests


# TODO get current username
def get_repository(repository_name, username):
    response = requests.get(
        f'https://api.github.com/repos/{username}/{repository_name}'
    )
    if response.status_code != 200:
        return None

    return response.json()


def get_commits(repository_name, username, days_ago=30):

    payload = {
        'since': datetime.datetime.now()-datetime.timedelta(days=days_ago)
    }
    response = requests.get(
        f'https://api.github.com/repos/{username}/{repository_name}/commits',
        params=payload
    )

    if response.status_code != 200:
        return None

    return response.json()
