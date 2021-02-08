import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';


class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return commitAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  render() {
    const {showSuccessMessage, showErrorMessage, errorMessages} = this.props;
    return (
    <Form 
      onSubmit={this.submit}
      showSuccessMessage={showSuccessMessage}
      showErrorMessage={showErrorMessage}
      errorMessages={errorMessages}
    />
    );
  }
}

RepoCreateContainer.propTypes = {
  showSuccessMessage: PropTypes.bool.isRequired,
  showErrorMessage: PropTypes.bool.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = store => ({
  showSuccessMessage: store.commitState.showSuccessMessage,
  showErrorMessage: store.commitState.showErrorMessage,
  errorMessages: store.commitState.errorMessages,
});

export default connect(mapStateToProps)(RepoCreateContainer);
