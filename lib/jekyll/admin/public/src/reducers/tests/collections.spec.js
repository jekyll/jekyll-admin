import expect from 'expect';
import reducer from '../collections';
import * as types from '../../constants/actionTypes';

const collection = {
  "id": "the-revenant",
  "collection_name": "movies",
  "document_id": "the-revenant",
  "body": "A frontiersman on a fur trading expedition in the 1820s fights.",
  "meta": {
    "layout": "default",
    "title": "The Revenant"
  }
};

const movies = { collection_name: "movies", meta: {}};

const documents = [
  {
    "id": "testing-posts",
    "collection_name": "posts",
    "document_id": "testing-posts",
    "body": "You’ll find this post in your `_posts` directory.",
    "meta": {
      "layout": "post",
      "title": "Testing Posts",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "test"
    }
  },
  {
    "id": "2016-05-29-google-summer-of-code",
    "collection_name": "posts",
    "document_id": "2016-05-29-google-summer-of-code",
    "body": "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.",
    "meta": {
      "layout": "post",
      "title": "Google Summer of Code!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "gsoc"
    }
  },
  {
    "id": "2016-01-01-some-post",
    "collection_name": "posts",
    "document_id": "2016-01-01-some-post",
    "body": "You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.",
    "meta": {
      "layout": "post",
      "title": "Welcome to Jekyll!",
      "date": "2016-05-20 01:10:46 +0300",
      "categories": "jekyll update"
    }
  }
];

describe('Reducers::Collections', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentCollection: {},
      currentDocument: {},
      currentDocuments: [],
      message: "",
      collections: [],
      isFetching: false
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

});
