import { create } from 'apisauce';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/_api'
    : 'http://localhost:4000/_api';

const api = create({
  baseURL: BASE_URL,
});

export const getConfiguration = () => api.get('/configuration');

export const getPages = (splat = '') => api.get(`/pages/${splat}`);

export const deletePage = (splat = '', filename) => {
  const endpoint = splat ? `/pages/${splat}/${filename}` : `/pages/${filename}`;
  return api.delete(endpoint);
};

export const updatePage = (splat = '', filename) => {
  const endpoint = splat ? `/pages/${splat}/${filename}` : `/pages/${filename}`;
  return api.post(endpoint);
};

export const getDocuments = (collection, splat) => {
  const endpoint = splat
    ? `/collections/${collection}/entries/${splat}`
    : `/collections/${collection}/entries`;
  return api.get(endpoint);
};

export const deleteDocument = (collection, splat = '', filename) => {
  const endpoint = splat
    ? `/${collection}/${splat}/${filename}`
    : `/${collection}/${filename}`;
  return api.delete(endpoint);
};

export const getDatafiles = (splat = '') => {
  const endpoint = `/data/${splat}`;
  return api.get(endpoint);
};

export const deleteDatafile = (splat = '', filename) => {
  const endpoint = splat ? `/data/${splat}/${filename}` : `/data/${filename}`;
  return api.delete(endpoint);
};
