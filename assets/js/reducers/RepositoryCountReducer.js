import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
};

const repositoryCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORY_COUNT_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload.data),
      };
    default:
      return state;
  }
};

export default repositoryCountReducer;
