import _ from 'underscore';

import {
  ADD_METAFIELD,
  REMOVE_METAFIELD,
  SETUP_METADATA,
  UPDATE_FIELD_KEY,
  UPDATE_FIELD_VALUE,
  MOVE_ARRAY_ITEM,
  CONVERT_FIELD
} from '../constants/actionTypes';

import { addField, removeField, updateFieldKey,
  updateFieldValue, moveArrayItem, convertField } from '../utils/helpers';

// TODO normalize the metadata
export default function metadata(state = {
  metadata: {},
  new_field_count: 1,
  key_prefix: '' // force children to be destroyed on sort
}, action) {
  switch (action.type) {
    case SETUP_METADATA:
      return Object.assign({}, state, {
        metadata: action.meta
      });
    case ADD_METAFIELD:
      return Object.assign({}, state, {
        metadata: addField(state, action.namePrefix),
        new_field_count: state.new_field_count + 1
      });
    case REMOVE_METAFIELD:
      return Object.assign({}, state, {
        metadata: removeField(state, action.namePrefix, action.key)
      });
    case UPDATE_FIELD_KEY:
      return Object.assign({}, state, {
        metadata: updateFieldKey(
          state,
          action.namePrefix,
          action.fieldKey,
          action.newKey
        )
      });
    case UPDATE_FIELD_VALUE:
      return Object.assign({}, state, {
        metadata: updateFieldValue(
          state,
          action.nameAttr,
          action.value
        )
      });
    case MOVE_ARRAY_ITEM:
      return Object.assign({}, state, {
        metadata: moveArrayItem(
          state,
          action.namePrefix,
          action.srcInd,
          action.targetInd
        ),
        key_prefix: Math.random() * 100 + ''
      });
    case CONVERT_FIELD:
      return Object.assign({}, state, {
        metadata: convertField(
          state,
          action.nameAttr,
          action.convertType
        ),
        new_field_count: state.new_field_count + 1
      });
    default:
      return state;
  }
}
