import { create } from 'apisauce';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/_api'
    : 'http://localhost:4000/_api';

const api = create({
  baseURL: BASE_URL,
});

export const getConfiguration = () => api.get('/configuration');
