import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import commitsFilterReducer from './CommitsFilterReducer';
import repositoryCountReducer from './RepositoryCountReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  commitsFilterState: commitsFilterReducer,
  repositoryCountState: repositoryCountReducer,
});

export default reducers;
