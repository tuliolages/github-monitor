import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select'


const CommitFilterForm = (props) => {
  const { repository, repositories,author} = props

  const options = [
    { label: 'All' },
    ...repositories.map(({name, id}) => ({label: name, value: id}))
  ]
  const currentOption = (options || []).find(({value}) => value === repository) || options[0]

  return (
    <div className="form-group">
      <Select
        value={currentOption}
        onChange={props.onChange('repository')}
        options={options}
      />

      <select className="form-control" name="author" id="lang" value={props.author} onChange={props.onChange}>
        <option value="">Todos</option>
        <option value="unknown">unknown</option>
        <option value="renovate-bot">renovate-bot</option>
      </select>
    </div>
  );
};

CommitFilterForm.propTypes = {
  repository: PropTypes.string,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CommitFilterForm;
