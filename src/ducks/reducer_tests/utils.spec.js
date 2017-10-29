import * as utilsDuck from '../utils';

const reducer = utilsDuck.default;

describe('Reducers::Utils', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      input: '',
      errors: [],
    });
  });

  it('should handle search', () => {
    expect(
      reducer(
        {},
        {
          type: utilsDuck.SEARCH_CONTENT,
          input: 'Some post',
        }
      )
    ).toEqual({
      input: 'Some post',
    });
  });

  it('should validate form', () => {
    expect(
      reducer(
        { errors: ['The title is required'] },
        {
          type: utilsDuck.CLEAR_ERRORS,
        }
      )
    ).toEqual({
      errors: [],
    });
  });

  it('should return error messages', () => {
    expect(
      reducer(
        {},
        {
          type: utilsDuck.VALIDATION_ERROR,
          errors: ['The title is required'],
        }
      )
    ).toEqual({
      errors: ['The title is required'],
    });
  });
});
