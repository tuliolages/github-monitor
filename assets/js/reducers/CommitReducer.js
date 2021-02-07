import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  count: 0,
  pageSize: 10,
  page: 1,
  successMessage: false,
  repository: null,
  author: null
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.results),
        pageSize: action.payload.page_size,
        page: action.payload.page || 1,
        count: action.payload.count,
        repository: action.payload.repository__name,
        author: action.payload.author
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, successMessage: action.payload.successMessage};
    }
    default:
      return state;
  }
};

export default commitReducer;
