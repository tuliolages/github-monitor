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
      // console.log('GET_COMMITS_SUCCESS')
      // console.log(action.payload.results)
      return {
        ...state,
        commits: Object.values(action.payload.results),
        pageSize: action.payload.page_size,
        count: action.payload.count,
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, successMessage: action.payload.successMessage};
    }
    case types.UPDATE_COMMITS_FILTERS:
      console.log('UPDATE_COMMITS_FILTERS')
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default commitReducer;
