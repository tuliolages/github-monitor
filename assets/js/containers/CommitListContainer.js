import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

class CommitListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getCommits();
  }

  handlePageClick({selected}) {
    commitAPI.getCommits({
      page: (selected + 1)
    })
  }

  render() {
    const {commits, count, pageSize} = this.props;
    return (
      <div>
        <CommitList commits={commits} />
        <ReactPaginate
          pageCount={Math.ceil(count/pageSize)}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  count: store.commitState.count,
  pageSize: store.commitState.pageSize,
});

export default connect(mapStateToProps)(CommitListContainer);
