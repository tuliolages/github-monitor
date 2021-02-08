import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
  authors: []
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload.data),
      };
    case types.GET_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: Object.values(action.payload.data),
      };
    default:
      return state;
  }
};

export default repositoryReducer;
