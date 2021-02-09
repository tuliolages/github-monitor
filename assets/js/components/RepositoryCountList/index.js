import React from 'react';
import PropTypes from 'prop-types';

const RepositoryCountList = (props) => {
  const { repositories } = props;
  return (
    <div>
      {(
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Repository List
            </div>

            <div className="card-body">
              {repositories.length !== 0 && repositories.map((repository, index) => (
                <div key={`${repository.name}-index`}>
                    {repository.name} - {repository.count}
                </div>
              ))}
              {repositories.length === 0 && (
                <p>There are no repositories</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

RepositoryCountList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepositoryCountList;
