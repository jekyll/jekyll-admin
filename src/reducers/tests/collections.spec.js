import expect from 'expect';
import reducer from '../collections';
import * as types from '../../constants/actionTypes';

import { doc, collection, collections } from './fixtures';

describe('Reducers::Collections', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentCollection: {},
      currentDocument: {},
      currentDocuments: [],
      collections: [],
      isFetching: false,
      updated: false
    });
  });

  it('should handle fetchCollections', () => {
    expect(
      reducer({}, {
        type: types.FETCH_COLLECTIONS_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({isFetching: true}, {
        type: types.FETCH_COLLECTIONS_SUCCESS,
        collections
      })
    ).toEqual({
      collections,
      isFetching: false
    });
    expect(
      reducer({isFetching: true}, {
        type: types.FETCH_COLLECTIONS_FAILURE
      })
    ).toEqual({
      isFetching: false
    });
  });

  it('should handle fetchCollection', () => {
    expect(
      reducer({}, {
        type: types.FETCH_COLLECTION_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_COLLECTION_SUCCESS,
        collection
      })
    ).toEqual({
      currentCollection: collection,
      currentDocuments: collection.documents,
      isFetching: false
    });
    expect(
      reducer({isFetching: true}, {
        type: types.FETCH_COLLECTION_FAILURE
      })
    ).toEqual({
      isFetching: false
    });
  });

  it('should handle deleteDocument', () => {
    expect(
      reducer({ currentDocuments: [doc] }, {
        type: types.DELETE_DOCUMENT_SUCCESS,
        id: doc.path.substring(doc.path.lastIndexOf('/') + 1)
      })
    ).toEqual({
      currentDocuments: []
    });
  });

  it('should handle putDocument', () => {
    expect(
      reducer({}, {
        type: types.PUT_DOCUMENT_SUCCESS,
        doc
      })
    ).toEqual({
      currentDocument: doc,
      updated: true
    });
    expect(
      reducer({updated:true}, {})
    ).toEqual({
      updated: false
    });
  });
});
