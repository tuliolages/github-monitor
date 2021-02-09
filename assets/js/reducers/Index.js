import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import commitsFilterReducer from './CommitsFilterReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  commitsFilterState: commitsFilterReducer,
});

export default reducers;
