import React from 'react';
import { shallow } from 'enzyme';
import CommitFilter from '../CommitFilter';

test('Render empty filter selects', () => {
  const component = shallow(
    <CommitFilter
      authors={[]}
      repositories={[]}
      onChange={() => { }}
    />
  );
  expect(component).toMatchSnapshot();
});

test('Render with filter select options', () => {
  const component = shallow(
    <CommitFilter
      authors={[{ author: 'author1' }, { author: 'author2' },]}
      repositories={[{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' },]}
      onChange={() => { }}
    />
  );
  expect(component).toMatchSnapshot();
});

test('Render with filter select options and already selected options', () => {
  const component = shallow(
    <CommitFilter
      author={"author1"}
      authors={[{ author: 'author1' }, { author: 'author2' }]}
      repository={1}
      repositories={[{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }]}
      onChange={() => { }}
    />
  );
  expect(component).toMatchSnapshot();
});
