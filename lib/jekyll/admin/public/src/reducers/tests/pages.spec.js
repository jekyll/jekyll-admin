import expect from 'expect';
import reducer from '../pages';
import * as types from '../../constants/actionTypes';

describe('Reducers::Pages', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      pages: [],
      page: {},
      message: "",
      isFetching: false
    });
  });

  it('should handle fetchPages', () => {
    expect(
      reducer({}, {
        type: types.PAGES_RECEIVED,
        pages: [{
          "id": "about",
          "page_id": "about",
          "body": "This is the base Jekyll theme.",
          "meta": {
            "layout": "page",
            "title": "About",
            "permalink": "/about/"
          }
        }]
      })
    ).toEqual({
      pages: [{
        "id": "about",
        "page_id": "about",
        "body": "This is the base Jekyll theme.",
        "meta": {
          "layout": "page",
          "title": "About",
          "permalink": "/about/"
        }
      }],
      page: {},
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.REQUEST_PAGES
      })
    ).toEqual({
      isFetching: true
    });
  });

  it('should handle fetchPage(id)', () => {
    expect(
      reducer({}, {
        type: types.PAGE_RECEIVED,
        page: {
          "id": "about",
          "page_id": "about",
          "body": "This is the base Jekyll theme.",
          "meta": {
            "layout": "page",
            "title": "About",
            "permalink": "/about/"
          }
        }
      })
    ).toEqual({
      page: {
        "id": "about",
        "page_id": "about",
        "body": "This is the base Jekyll theme.",
        "meta": {
          "layout": "page",
          "title": "About",
          "permalink": "/about/"
        }
      },
      isFetching: false
    });
    expect(
      reducer({}, {
        type: types.REQUEST_PAGE
      })
    ).toEqual({
      isFetching: true
    });
  });

  it('should handle deletePages', () => {
    expect(reducer({ message: "" }, { type: types.PAGE_DELETED })).toEqual({
      message: "Page deleted."
    });

    expect(
      reducer({}, {
        type: types.PAGE_DELETE_ERROR,
        error: 'Something gone wrong.'
      })
    ).toEqual({
      message: 'Something gone wrong.'
    });
  });
});
