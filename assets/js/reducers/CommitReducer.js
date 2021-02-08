import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  count: 0,
  pageSize: 10,
  page: 1,
  showSuccessMessage: false,
  showErrorMessage: false,
  errorMessages: null,
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
        count: action.payload.count,
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {
        ...state,
        showSuccessMessage: action.payload.showSuccessMessage,
        errorMessages: null,
        showErrorMessage: false
      };
    }
    case types.CREATE_REPOSITORY_ERROR: {
      return {
        ...state,
        showErrorMessage: action.payload.showErrorMessage,
        errorMessages: action.payload.response.non_field_errors,
        showSuccessMessage: false
      };
    }
    case types.UPDATE_COMMITS_FILTERS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

export default commitReducer;
