import expect from 'expect';
import * as actions from '../../actions/TodoActions';
import * as types from '../../constants/ActionTypes';

describe('Actions::Search', () => {
  it('should create an action', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.SEARCH_CONTENT,
      text
    };
    expect(actions.searchByTitle(text)).toEqual(expectedAction);
  });
});
