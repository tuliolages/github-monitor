import * as types from './ActionTypes';

export const getRepositoryCountSuccess = (response) => ({
  type: types.GET_REPOSITORY_COUNT_SUCCESS,
  payload: response,
});