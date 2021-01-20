import http from './api';

class CustomersService {
  constructor() {
    this.http = http;
  }

  getAll() {
    return this.http.get('/customers');
  }

  get(id) {
    return this.http.get(`/customers/${id}`);
  }

  create(data) {
    return this.http.post('/customers', data);
  }

  update(id, data) {
    return this.http.put(`/customers/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`/customers/${id}`);
  }

  deleteAll() {
    return this.http.delete(`/customers`);
  }

  filter() {
    return this.http.get(`/customers`);
  }
}

export default new CustomersService();
