import datetime
import requests


# TODO get current username
def get_repository(repository_name):

    response = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}'
    )

    if response.status_code != 200:
        raise Exception("Repository does not exist")

    return response.json()


def get_commits(repository_name):

    payload = {'since': datetime.datetime.now()-datetime.timedelta(days=30)}
    response = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}/commits',
        params=payload
    )

    if response.status_code != 200:
        raise Exception("Unable to retrieve commits")
    print(response.json())
    return response.json()
