import React from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const {commits,updateFilters} = props;
  return (
    <div>
      {(
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.length !== 0 && commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <span className="filter-link" onClick={() => updateFilters({author: commit.author})}>{commit.author}</span>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <span className="filter-link" onClick={() => updateFilters({repository: commit.repository.id})}>{commit.repository.name}</span>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
              {commits.length === 0 && (
                <p>There are no commits</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFilters: PropTypes.func.isRequired,
};

export default CommitList;
