import axios from 'axios';
import { reset } from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess, updateCommitsFilters, getRepositoriesSuccess
} from '../actions/CommitActions';

export const getCommits = (params) => axios.get(`/api/commits/`, { params })
  .then((response) => {
    store.dispatch(getCommitsSuccess({ ...response.data, ...params }));
  });

export const getRepositories = () => axios.get(`/api/repositories/`)
  .then((response) => {
    store.dispatch(getRepositoriesSuccess(response));
  });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, { headers })
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
    getCommits()
  }).catch((error) => {
    const err = error.response;
    console.log(err);
  });

function juju(filterFields) {
  return (dispatch, getState) => {
    dispatch(updateCommitsFilters(filterFields));
    const {page, author, repository} = getState().commitState
    getCommits({
      author,
      page,
      repository
    })
    // API.save(getState()).catch(() => {
    //   alert('Something went wrong, try again later.');
    //   dispatch({
    //     type: REMOVE_VALUE,
    //     value,
    //   });
    // });
  };
}

export const updateCommitsFiltersForm = (filterFields) => {
  store.dispatch(juju(filterFields))
  

  // const secondState = getState();
  // console.log(getState)
  // getCommits(secondState)
}

