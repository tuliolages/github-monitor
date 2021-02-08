import * as types from './ActionTypes';

export const createRepositorySuccess = (response, showSuccessMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, showSuccessMessage},
});

export const createRepositoryError = (response, showErrorMessage) => ({
  type: types.CREATE_REPOSITORY_ERROR,
  payload: {response, showErrorMessage},
});

export const getRepositoriesSuccess = response => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: response,
});

export const getAuthorsSuccess = response => ({
  type: types.GET_AUTHORS_SUCCESS,
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