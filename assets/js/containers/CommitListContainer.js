import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import CommitFilterContainer from './CommitFilterContainer';

class CommitListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getCommits();
  }

  handlePageClick({ selected }) {
    const { author, repository } = this.props;
    commitAPI.updateCommitsFiltersForm({
      page: (selected + 1),
      author,
      repository,
    });
  }

  updateFilters(filterParams) {
    commitAPI.updateCommitsFiltersForm({
      ...filterParams,
      page: 1,
    });
  }

  render() {
    const {
      commits, count, pageSize, page,
    } = this.props;
    return (
      <div>
        <CommitFilterContainer />
        <CommitList commits={commits} updateFilters={this.updateFilters.bind(this)} />
        <ReactPaginate
          pageCount={Math.ceil(count / pageSize)}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick.bind(this)}
          forcePage={page - 1}
          breakLinkClassName="page-link"
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  repository: PropTypes.number,
  author: PropTypes.string,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  commits: store.commitState.commits,
  count: store.commitState.count,
  pageSize: store.commitState.pageSize,
  repository: store.commitState.repository,
  author: store.commitState.author,
  page: store.commitState.page,
});

export default connect(mapStateToProps)(CommitListContainer);
