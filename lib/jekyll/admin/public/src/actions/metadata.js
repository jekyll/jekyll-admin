import * as ActionTypes from '../constants/actionTypes';

export function setupMetadata(meta) {
  return {
    type: ActionTypes.SETUP_METADATA,
    meta
  };
}

export function addField(namePrefix) {
  return {
    type: ActionTypes.ADD_METAFIELD,
    namePrefix
  };
}

export function removeField(namePrefix, key) {
  return {
    type: ActionTypes.REMOVE_METAFIELD,
    namePrefix,
    key
  };
}

export function updateFieldKey(namePrefix, fieldKey, newKey) {
  return {
    type: ActionTypes.UPDATE_FIELD_KEY,
    namePrefix,
    fieldKey,
    newKey
  };
}

export function updateFieldValue(nameAttr, value) {
  return {
    type: ActionTypes.UPDATE_FIELD_VALUE,
    nameAttr,
    value
  };
}

export function moveArrayItem(namePrefix, srcInd, targetInd) {
  return {
    type: ActionTypes.MOVE_ARRAY_ITEM,
    namePrefix,
    srcInd,
    targetInd
  };
}

export function convertField(nameAttr, convertType) {
  return {
    type: ActionTypes.CONVERT_FIELD,
    nameAttr,
    convertType
  };
}
