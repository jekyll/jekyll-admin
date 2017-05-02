import * as actions from '../utils';
import * as types from '../../constants/actionTypes';

describe('Actions::Utils', () => {
  it('creates SEARCH_CONTENT', () => {
    const input = 'Finish docs';
    const expectedAction = { type: types.SEARCH_CONTENT, input };
    expect(actions.search(input)).toEqual(expectedAction);
  });

  it('creates VALIDATION_ERROR', () => {
    const errors = {
      title: 'Title is required.',
      draft: 'Should be boolean type.'
    };
    const expectedAction = {
      type: types.VALIDATION_ERROR,
      errors
    };
    expect(
      actions.validationError(errors)
    ).toEqual(expectedAction);
  });
});
