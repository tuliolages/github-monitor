import React from 'react';
import { shallow } from 'enzyme';
import CommitList from '../CommitList';

test('Render filter selects', () => {
  const component = shallow(
    <CommitList
      commits={[{
        message: 'add github_external_api tests',
        sha: '4f9ff7c6e4d26dfc50d69c3ddbc49717928a9e92',
        author: 'unknown',
        url: 'https://api.github.com/repos/tuliolages/github-monitor/commits/4f9ff7c6e4d26dfc50d69c3ddbc49717928a9e92',
        avatar: '',
        date: '2021-02-06T20:13:56-03:00',
        repository: {
          name: 'github-monitor',
          id: 13,
        },
      },
      {
        message: 'creates initial view tests and fixtures',
        sha: '65dfa477eefd6a4c98ae781740b042b86a454673',
        author: 'unknown',
        url: 'https://api.github.com/repos/tuliolages/github-monitor/commits/65dfa477eefd6a4c98ae781740b042b86a454673',
        avatar: '',
        date: '2021-02-06T17:04:29-03:00',
        repository: {
          name: 'github-monitor',
          id: 13,
        },
      }]}
      updateFilters={() => { }}
    />
  );
  expect(component).toMatchSnapshot();
});

test('Render empty filter selects', () => {
  const component = shallow(
    <CommitList
      commits={[]}
      updateFilters={() => { }}
    />
  );
  expect(component).toMatchSnapshot();
});
