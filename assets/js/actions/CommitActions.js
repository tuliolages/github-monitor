import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const getRepositoriesSuccess = response => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: response,
});

export const getCommitsSuccess = response => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: response,
});

export const updateCommitsFilters = (filterFields) => ({
  type: types.UPDATE_COMMITS_FILTERS,
  payload: filterFields
})