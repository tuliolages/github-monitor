import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: []
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload.data),
      };
    default:
      return state;
  }
};

export default repositoryReducer;
