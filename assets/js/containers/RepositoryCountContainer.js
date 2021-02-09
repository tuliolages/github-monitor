import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as repositoryAPI from '../api/RepositoryAPI';
import RepositoryCountList from '../components/RepositoryCountList';


class RepositoryCountContainer extends React.Component {
  componentDidMount() {
    repositoryAPI.getRepositories();
  }

  render() {
    const { repositories } = this.props;
    return (
      <div>
        <RepositoryCountList repositories={repositories} />
      </div>
    );
  }
}

RepositoryCountContainer.propTypes = {
    repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
    repositories: store.repositoryCountState.repositories
});

export default connect(mapStateToProps)(RepositoryCountContainer);
