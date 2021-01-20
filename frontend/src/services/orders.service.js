import http from './api';

class OrdersService {
  constructor() {
    this.http = http;
  }

  getAll() {
    return this.http.get('/orders');
  }

  get(id) {
    return this.http.get(`/orders/${id}`);
  }

  create(data) {
    return this.http.post('/orders', data);
  }

  update(id, data) {
    return this.http.put(`/orders/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`/orders/${id}`);
  }

  deleteAll() {
    return this.http.delete(`/orders`);
  }

  filter() {
    return this.http.get(`/orders`);
  }
}

export default new OrdersService();
