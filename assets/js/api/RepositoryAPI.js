import axios from 'axios';
import store from '../store';
import {
  getRepositoryCountSuccess
} from '../actions/RepositoryCountActons';

export const getRepositories = () => axios.get(`/api/repositories/count/`)
  .then((response) => {
    store.dispatch(getRepositoryCountSuccess(response));
  });
