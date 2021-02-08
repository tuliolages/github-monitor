import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/CommitFilterForm';

class CommitFilterContainer extends React.Component {
    componentDidMount() {
        commitAPI.getRepositories();
        commitAPI.getAuthors();
    }

    updateFilters(field) {
        return ({value}) => {
            commitAPI.updateCommitsFiltersForm({
                [field]: value,
                page: 1
            })
        }
    }

    render() {
        const {author, authors,repository, repositories} = this.props
        return (
            <div>
                <Form author={author}
                    authors={authors}
                    repository={repository}
                    repositories={repositories}
                    onChange={this.updateFilters.bind(this)}
                />
            </div>
        );
    }
}

CommitFilterContainer.propTypes = {
    repository: PropTypes.number,
    repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
    author: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
    repository: store.commitState.repository,
    repositories: store.repositoryState.repositories,
    author: store.commitState.author,
    authors: store.repositoryState.authors,
});

export default connect(mapStateToProps)(CommitFilterContainer);
