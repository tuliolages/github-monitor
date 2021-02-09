import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select'


const CommitFilter = (props) => {
  const { repository, repositories, author, authors } = props

  const repositoryOptions = [
    { label: 'All' },
    ...repositories.map(({ name, id }) => ({ label: name, value: id }))
  ]
  const currentRepositoryOption = (repositoryOptions || []).find(({ value }) => value === repository) || repositoryOptions[0]

  const authorOptions = [
    { label: 'All' },
    ...authors.map(({ author }) => ({ label: author, value: author }))
  ]
  const currentauthorOption = (authorOptions || []).find(({ value }) => value === author) || repositoryOptions[0]

  return (
    <div className="card card-outline-secondary my-4">
      <div className="card-header">
        Filters
      </div>

      <div className="card-body">
        <div className="form-group">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="repositories">Repositories</label>
              <Select
                id="repositories"
                value={currentRepositoryOption}
                onChange={props.onChange('repository')}
                options={repositoryOptions}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="authors">Authors</label>
              <Select
                id="authors"
                value={currentauthorOption}
                onChange={props.onChange('author')}
                options={authorOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommitFilter.propTypes = {
  repository: PropTypes.number,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitFilter;
