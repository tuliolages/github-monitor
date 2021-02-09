import React from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const {commits, updateFilters} = props;
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
                      <a href="#" onClick={() => updateFilters({author: commit.author})}>{commit.author}</a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a href="#" onClick={() => updateFilters({repository: commit.repository.id})}>{commit.repository.name}</a>
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
