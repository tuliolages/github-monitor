import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select'


const CommitFilterForm = (props) => {
  const { repository,repositories,author, authors} = props

  const repositoryOptions = [
    { label: 'All' },
    ...repositories.map(({name, id}) => ({label: name, value: id}))
  ]
  const currentRepositoryOption = (repositoryOptions || []).find(({value}) => value === repository) || repositoryOptions[0]
  
  const authorOptions = [
    { label: 'All' },
    ...authors.map(({author}) => ({label: author, value: author}))
  ]
  const currentauthorOption = (authorOptions || []).find(({value}) => value === author) || repositoryOptions[0]

  return (
    <div className="form-group">
      <Select
        value={currentRepositoryOption}
        onChange={props.onChange('repository')}
        options={repositoryOptions}
      />

      <Select
        value={currentauthorOption}
        onChange={props.onChange('author')}
        options={authorOptions}
      />
    </div>
  );
};

CommitFilterForm.propTypes = {
  repository: PropTypes.number,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitFilterForm;
