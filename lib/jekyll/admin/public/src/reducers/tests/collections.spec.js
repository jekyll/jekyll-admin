import expect from 'expect';
import reducer from '../collections';
import * as types from '../../constants/actionTypes';

import { doc, movies, documents } from './fixtures';

describe('Reducers::Collections', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentCollection: {},
      currentDocument: {},
      currentDocuments: [],
      message: "",
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
        collections: ["movies", "posts"]
      })
    ).toEqual({
      collections: ["movies", "posts"],
      isFetching: false
    });
    expect(
      reducer({isFetching: true}, {
        type: types.FETCH_COLLECTIONS_FAILURE,
        error: "Something gone wrong."
      })
    ).toEqual({
      message: "Something gone wrong.",
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
        collection: movies
      })
    ).toEqual({
      currentCollection: movies,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_COLLECTION_FAILURE,
        error: "Something gone wrong."
      })
    ).toEqual({
      message: "Something gone wrong.",
      isFetching: false
    });
  });

  it('should handle fetchCollectionDocuments', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DOCUMENTS_REQUEST
      })
    ).toEqual({
      isFetching: true
    });
    expect(
      reducer({}, {
        type: types.FETCH_DOCUMENTS_SUCCESS,
        documents
      })
    ).toEqual({
      currentDocuments: documents,
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.FETCH_DOCUMENTS_FAILURE,
        error: "Something gone wrong."
      })
    ).toEqual({
      message: "Something gone wrong.",
      isFetching: false
    });
  });

  it('should handle postDocument', () => {
    expect(
      reducer({}, {
        type: types.POST_DOCUMENT_SUCCESS,
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
    expect(
      reducer({}, {
        type: types.POST_DOCUMENT_FAILURE,
        error: "Some error"
      })
    ).toEqual({
      message: "Some error"
    });
  });
});
