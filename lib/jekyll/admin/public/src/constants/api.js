let prefix;
if (process.env.NODE_ENV === 'production') {
  prefix = '/_api';
} else {
  prefix = 'http://localhost:4000/_api';
}

export const API = prefix;

export const getConfigurationUrl = () => `${API}/configuration`;
export const putConfigurationUrl = () => `${API}/configuration`;

export const getPagesUrl = () => `${API}/pages`;
export const getPageUrl = (id) => `${API}/pages/${id}`;
export const putPageUrl = (id) => `${API}/pages/${id}`;
export const deletePageUrl = (id) => `${API}/pages/${id}`;

export const getCollectionsUrl = () => `${API}/collections`;
export const getCollectionUrl = (collection_name) =>
  `${API}/collections/${collection_name}`;
export const getCollectionDocumentsUrl = (collection_name) =>
  `${API}/collections/${collection_name}/documents`;
export const getCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/documents/${id}`;
export const putCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/documents/${id}`;
export const deleteCollectionDocumentUrl = (collection_name, id) =>
  `${API}/collections/${collection_name}/documents/${id}`;
