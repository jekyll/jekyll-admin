import expect from 'expect';
import reducer from '../collections';
import * as types from '../../constants/actionTypes';

describe('Reducers::Collections', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      message: ""
    });
  });

  it('should handle fetchCollections', () => {
    expect(
      reducer({}, {
        type: types.COLLECTIONS_RECEIVED,
        collections: [{
          "id": "the-revenant",
          "collection_name": "movies",
          "document_id": "the-revenant",
          "body": "A frontiersman on a fur trading expedition.",
          "meta": {
            "layout": "default",
            "title": "The Revenant"
          }
        }]
      })
    ).toEqual({
      movies: [{
        "id": "the-revenant",
        "collection_name": "movies",
        "document_id": "the-revenant",
        "body": "A frontiersman on a fur trading expedition.",
        "meta": {
          "layout": "default",
          "title": "The Revenant"
        }
      }]
    });
  });

  it('should handle deleteDocument', () => {
    expect(reducer({ message: "" }, { type: types.DOCUMENT_DELETED })).toEqual({
      message: "Document deleted."
    });

    expect(
      reducer({}, {
        type: types.DOCUMENT_DELETE_ERROR,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.'
    });
  });
});
