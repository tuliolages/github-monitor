import requests


def get_repository(repository_name):
    repository_data = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}'
    )
    
    return repository_data


def get_commits(repository_name):
    repository_data = requests.get(
        f'https://api.github.com/repos/tuliolages/{repository_name}/commits'
    )
    
    return repository_data