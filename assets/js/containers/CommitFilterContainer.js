import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/CommitFilterForm';

class CommitFilterContainer extends React.Component {
    componentDidMount() {
        commitAPI.getRepositories();
    }

    updateFilters(field) {
        return ({value}) => {
            console.log(field, value)
            commitAPI.updateCommitsFiltersForm({
                [field]: value,
                page: 1
            })
        }
    }

    render() {
        const {author,repository, repositories} = this.props
        return (
            <div>
                <Form author={author}
                    repository={repository}
                    repositories={repositories}
                    onChange={this.updateFilters.bind(this)}
                />
            </div>
        );
    }
}

CommitFilterContainer.propTypes = {
    repository: PropTypes.string,
    repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
    author: PropTypes.string
};

const mapStateToProps = store => ({
    repository: store.commitState.repository,
    repositories: store.repositoryState.repositories,
    author: store.commitState.author,
});

export default connect(mapStateToProps)(CommitFilterContainer);
