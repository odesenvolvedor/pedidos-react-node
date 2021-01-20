import http from './api';

class ProductsService {
  constructor() {
    this.http = http;
  }

  getAll() {
    return this.http.get('/products');
  }

  get(id) {
    return this.http.get(`/products/${id}`);
  }

  create(data) {
    return this.http.post('/products', data);
  }

  update(id, data) {
    return this.http.put(`/products/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`/products/${id}`);
  }

  deleteAll() {
    return this.http.delete(`/products`);
  }

  filter() {
    return this.http.get(`/products`);
  }
}

export default new ProductsService();
