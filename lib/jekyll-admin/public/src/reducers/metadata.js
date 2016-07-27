import _ from 'underscore';

import {
  UPDATE_TITLE, UPDATE_BODY, UPDATE_PATH, UPDATE_DRAFT,
  ADD_METAFIELD, REMOVE_METAFIELD,
  STORE_CONTENT_FIELDS, UPDATE_FIELD_KEY, UPDATE_FIELD_VALUE,
  MOVE_ARRAY_ITEM, CONVERT_FIELD
} from '../constants/actionTypes';

import { addField, removeField, updateFieldKey,
  updateFieldValue, moveArrayItem, convertField } from '../utils/helpers';

// TODO normalize the metadata
export default function metadata(state = {
  metadata: {},
  new_field_count: 1,
  key_prefix: '', // force children to be destroyed on sort
  fieldChanged: false
}, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        metadata: {
          ...state.metadata,
          title: action.title
        },
        fieldChanged: true
      });
    case UPDATE_BODY:
      return Object.assign({}, state, {
        metadata: {
          ...state.metadata,
          raw_content: action.body
        },
        fieldChanged: true
      });
    case UPDATE_PATH:
      return Object.assign({}, state, {
        metadata: {
          ...state.metadata,
          path: action.path
        },
        fieldChanged: true
      });
    case UPDATE_DRAFT:
      return Object.assign({}, state, {
        draft: {
          ...state.metadata,
          draft: action.draft
        },
        fieldChanged: true
      });
    case STORE_CONTENT_FIELDS: {
      return Object.assign({}, state, {
        metadata: action.content
      });
    }
    case ADD_METAFIELD:
      return Object.assign({}, state, {
        metadata: addField(state, action.namePrefix),
        new_field_count: state.new_field_count + 1
      });
    case REMOVE_METAFIELD:
      return Object.assign({}, state, {
        metadata: removeField(state, action.namePrefix, action.key),
        fieldChanged: true,
        key_prefix: Math.random() * 100 + ''
      });
    case UPDATE_FIELD_KEY:
      return Object.assign({}, state, {
        metadata: updateFieldKey(
          state,
          action.namePrefix,
          action.fieldKey,
          action.newKey
        ),
        fieldChanged: true
      });
    case UPDATE_FIELD_VALUE:
      return Object.assign({}, state, {
        metadata: updateFieldValue(
          state,
          action.nameAttr,
          action.value
        ),
        fieldChanged: true
      });
    case MOVE_ARRAY_ITEM:
      return Object.assign({}, state, {
        metadata: moveArrayItem(
          state,
          action.namePrefix,
          action.srcInd,
          action.targetInd
        ),
        key_prefix: Math.random() * 100 + '',
        fieldChanged: true
      });
    case CONVERT_FIELD:
      return Object.assign({}, state, {
        metadata: convertField(
          state,
          action.nameAttr,
          action.convertType
        ),
        new_field_count: state.new_field_count + 1,
        fieldChanged: true
      });
    default:
    return Object.assign({}, state, {
      fieldChanged: false
    });
  }
}
