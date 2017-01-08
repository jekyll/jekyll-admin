export const API = process.env.NODE_ENV === 'production' ?
  '/_api' :
  'http://localhost:4000/_api';

export const getConfigurationUrl = () => `${API}/configuration`;
export const putConfigurationUrl = () => `${API}/configuration`;

export const getPagesUrl = () => `${API}/pages`;
export const getPageUrl = (id) => `${API}/pages/${id}`;
export const putPageUrl = (id) => `${API}/pages/${id}`;
export const deletePageUrl = (id) => `${API}/pages/${id}`;

export const getCollectionsUrl = () => `${API}/collections`;
export const getCollectionUrl = (collection_name) =>
  `${API}/collections/${collection_name}`;
export const getCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/${id}`;
export const putCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/${id}`;
export const deleteCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/${id}`;

export const getDataFilesUrl = () => `${API}/data`;
export const getDataFileUrl = (filename) => `${API}/data/${filename}`;
export const putDataFileUrl = (filename) => `${API}/data/${filename}`;
export const deleteDataFileUrl = (filename) => `${API}/data/${filename}`;

export const getStaticFilesUrl = () => `${API}/static_files`;
export const getStaticFileUrl = (filename) => `${API}/static_files/${filename}`;
export const putStaticFileUrl = (filename) => `${API}/static_files/${filename}`;
export const deleteStaticFileUrl = (filename) => `${API}/static_files/${filename}`;
