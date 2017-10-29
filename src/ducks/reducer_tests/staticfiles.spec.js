import * as staticfilesDuck from '../staticfiles';
import { staticfile } from './fixtures';

const reducer = staticfilesDuck.default;

describe('Reducers::StaticFiles', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      files: [],
      isFetching: false,
      uploading: false,
    });
  });

  it('should handle fetchPages', () => {
    expect(
      reducer(
        {},
        {
          type: staticfilesDuck.FETCH_STATICFILES_REQUEST,
        }
      )
    ).toEqual({
      isFetching: true,
    });
    expect(
      reducer(
        {},
        {
          type: staticfilesDuck.FETCH_STATICFILES_SUCCESS,
          files: [staticfile],
        }
      )
    ).toEqual({
      files: [staticfile],
      isFetching: false,
    });
    expect(
      reducer(
        {},
        {
          type: staticfilesDuck.FETCH_STATICFILES_FAILURE,
        }
      )
    ).toEqual({
      isFetching: false,
    });
  });

  it('should handle uploadStaticFiles', () => {
    expect(
      reducer(
        { uploading: false },
        {
          type: staticfilesDuck.PUT_STATICFILE_REQUEST,
        }
      )
    ).toEqual({
      uploading: true,
    });
    expect(
      reducer(
        { uploading: true },
        {
          type: staticfilesDuck.PUT_STATICFILE_SUCCESS,
          file: staticfile,
        }
      )
    ).toEqual({
      uploading: false,
    });
    expect(
      reducer(
        { uploading: true },
        {
          type: staticfilesDuck.PUT_STATICFILE_FAILURE,
        }
      )
    ).toEqual({
      uploading: false,
    });
  });
});
