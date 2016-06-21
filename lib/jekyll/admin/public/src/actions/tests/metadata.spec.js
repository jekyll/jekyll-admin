import expect from 'expect';
import * as actions from '../metadata';
import * as types from '../../constants/ActionTypes';

import { state } from './fixtures';

describe('Actions::Metadata', () => {
  it('creates SETUP_METADATA', () => {
    const meta = state.metadata;
    const expectedAction = {
      type: types.SETUP_METADATA,
      meta
    };
    expect(actions.setupMetadata(meta)).toEqual(expectedAction);
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
      actions.updateFieldKey('metadata', 'layout', 'layout1')
    ).toEqual(expectedAction);
  });
  it('creates UPDATE_FIELD_VALUE', () => {
    const expectedAction = {
      type: types.UPDATE_FIELD_VALUE,
      nameAttr: 'metadata["layout"]',
      value: 'post1'
    };
    expect(
      actions.updateFieldValue('metadata["layout"]', 'post1')
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
});
