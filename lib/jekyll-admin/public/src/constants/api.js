import fakeDB from '../../mock-api/fake-backup';
import _ from 'underscore';

// TODO make them functions later e.g getPage(id) => url

export const API = 'http://localhost:3004';

export const GET_CONFIGURATION = 'http://localhost:3004/configuration';
export const POST_CONFIGURATION = 'http://localhost:3004/configuration';

export const GET_PAGES = 'http://localhost:3004/pages';
export const GET_PAGE = 'http://localhost:3004/pages/';
export const POST_PAGE = 'http://localhost:3004/pages/';
export const DELETE_PAGE = 'http://localhost:3004/pages/';

export const GET_COLLECTIONS = 'http://localhost:3004/collections';
export const GET_COLLECTION = 'http://localhost:3004/collections/';
export const GET_COLLECTION_DOCUMENTS = 'http://localhost:3004/collections/';
export const GET_COLLECTION_DOCUMENT = 'http://localhost:3004/collections/';
export const POST_COLLECTION_DOCUMENT = 'http://localhost:3004/collections/';
export const DELETE_COLLECTION_DOCUMENT = 'http://localhost:3004/collections/';

// FAKE API - MISSING ONES
const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getCollections = () =>
  delay(500).then(() => fakeDB.collections);

export const getCollection = (collection_name) =>
  delay(500).then(() => fakeDB[collection_name]);

export const getCollectionDocuments = (collection_name) =>
  delay(500).then(() => fakeDB.documents[collection_name]);
