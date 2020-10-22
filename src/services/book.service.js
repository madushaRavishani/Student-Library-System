
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class BookDataService {

  create(data) {
    return axios.post(API_URL + 'add', data);
  }

  getAll() {
    return axios.get(API_URL + 'find');
  }

  get(id) {
    return axios.get(API_URL + `find/${id}`);
  }

  update(id, data) {
    return axios.put(API_URL + `update/${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL + `delete/${id}`);
  }

  deleteAll() {
    return axios.delete(API_URL + 'delete');
  }

  findByTitle(title) {
    return axios.get(`API_URL ? title=${title}`);
  }

}


export default new BookDataService();