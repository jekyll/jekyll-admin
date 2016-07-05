import * as ActionTypes from '../constants/actionTypes';

export function storeContentFields(content) {
  return {
    type: ActionTypes.STORE_CONTENT_FIELDS,
    content
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

export function updateTitle(title) {
  return {
    type: ActionTypes.UPDATE_TITLE,
    title
  };
}

export function updateBody(body) {
  return {
    type: ActionTypes.UPDATE_BODY,
    body
  };
}

export function updateDraft(isDraft) {
  return {
    type: ActionTypes.UPDATE_DRAFT,
    isDraft
  };
}

export function updatePath(path) {
  return {
    type: ActionTypes.UPDATE_PATH,
    path
  };
}
