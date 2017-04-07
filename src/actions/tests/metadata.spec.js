import expect from 'expect';
import * as actions from '../metadata';
import * as types from '../../constants/actionTypes';

import { state } from './fixtures';

describe('Actions::Metadata', () => {
  it('creates STORE_CONTENT_FIELDS', () => {
    const content = state.metadata;
    const expectedAction = {
      type: types.STORE_CONTENT_FIELDS,
      content
    };
    expect(actions.storeContentFields(content)).toEqual(expectedAction);
  });

  it('creates ADD_METAFIELD', () => {
    const expectedAction = {
      type: types.ADD_METAFIELD,
      namePrefix: 'metadata["mentors"]'
    };
    expect(actions.addField('metadata["mentors"]')).toEqual(expectedAction);
  });

  it('creates REMOVE_METAFIELD', () => {
    const expectedAction = {
      type: types.REMOVE_METAFIELD,
      namePrefix: 'metadata',
      key: 'layout'
    };
    expect(actions.removeField('metadata', 'layout')).toEqual(expectedAction);
  });

  it('creates UPDATE_FIELD_KEY', () => {
    const expectedAction = {
      type: types.UPDATE_FIELD_KEY,
      namePrefix: 'metadata',
      fieldKey: 'layout',
      newKey: 'layout1'
    };
    expect(
      actions.updateFieldKey('metadata', 'layout', ' layout1  ')
    ).toEqual(expectedAction);
  });

  it('creates UPDATE_FIELD_VALUE', () => {
    const expectedAction = {
      type: types.UPDATE_FIELD_VALUE,
      nameAttr: 'metadata["layout"]',
      value: 'post1'
    };
    expect(
      actions.updateFieldValue('metadata["layout"]', '  post1   ')
    ).toEqual(expectedAction);
  });

  it('creates MOVE_ARRAY_ITEM', () => {
    const expectedAction = {
      type: types.MOVE_ARRAY_ITEM,
      namePrefix: 'metadata["mentors"]',
      srcInd: 0,
      targetInd: 1
    };
    expect(
      actions.moveArrayItem('metadata["mentors"]', 0, 1)
    ).toEqual(expectedAction);
  });

  it('creates CONVERT_FIELD', () => {
    const expectedAction = {
      type: types.CONVERT_FIELD,
      nameAttr: 'metadata["mentors"]',
      convertType: 'simple'
    };
    expect(
      actions.convertField('metadata["mentors"]', 'simple')
    ).toEqual(expectedAction);
  });

  it('creates UPDATE_TITLE', () => {
    const expectedAction = {
      type: types.UPDATE_TITLE,
      title: 'Test Title'
    };
    expect(actions.updateTitle('Test Title')).toEqual(expectedAction);
  });

  it('creates UPDATE_BODY', () => {
    const expectedAction = {
      type: types.UPDATE_BODY,
      body: 'Test Body'
    };
    expect(actions.updateBody('Test Body')).toEqual(expectedAction);
  });

  it('creates UPDATE_DRAFT', () => {
    const expectedAction = {
      type: types.UPDATE_DRAFT,
      draft: false
    };
    expect(actions.updateDraft(false)).toEqual(expectedAction);
  });

  it('creates UPDATE_PATH', () => {
    const expectedAction = {
      type: types.UPDATE_PATH,
      path: 'test.md'
    };
    expect(
      actions.updatePath('test.md')
    ).toEqual(expectedAction);
  });
});
