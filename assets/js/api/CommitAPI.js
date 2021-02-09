import axios from 'axios';
import { reset } from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess, updateCommitsFilters,
  getRepositoriesSuccess, getAuthorsSuccess, createRepositoryError,
} from '../actions/CommitActions';

export const getCommits = (params) => axios.get(`/api/commits/`, { params })
  .then((response) => {
    store.dispatch(getCommitsSuccess({ ...response.data, ...params }));
  });

export const getRepositories = () => axios.get(`/api/repositories/`)
  .then((response) => {
    store.dispatch(getRepositoriesSuccess(response));
  });

export const getAuthors = () => axios.get(`/api/authors/`)
  .then((response) => {
    store.dispatch(getAuthorsSuccess(response));
  });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, { headers })
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
    getCommits();
    getRepositories();
    getAuthors();
  }).catch((error) => {
    const err = error.response;
    console.log(err);
    store.dispatch(createRepositoryError(err.data, true));
  });

function updateCommitsFiltersFormDispatcher(filterFields) {
  return (dispatch, getState) => {
    dispatch(updateCommitsFilters(filterFields));
    const { page, author, repository } = getState().commitState
    getCommits({
      author,
      page,
      repository,
    });
  };
}

export const updateCommitsFiltersForm = (filterFields) => {
  store.dispatch(updateCommitsFiltersFormDispatcher(filterFields));
}
