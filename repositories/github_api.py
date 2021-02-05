import requests


def get_repository(repository_name):
    response = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}'
    )

    if response.status_code != 200:
        raise Exception("Repository does not exist")
    
    return response.json()


def get_commits(repository_name):
    response = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}/commits'
    )
    
    if response.status_code != 200:
        raise Exception("Unable to retrieve commits")
    
    return response.json()