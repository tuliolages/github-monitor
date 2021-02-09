import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitFilter from '../components/CommitFilter';

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
        const {author, authors, repository, repositories} = this.props
        return (
            <div>
                <CommitFilter 
                    author={author}
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
    repositories: store.commitsFilterState.repositories,
    author: store.commitState.author,
    authors: store.commitsFilterState.authors,
});

export default connect(mapStateToProps)(CommitFilterContainer);
