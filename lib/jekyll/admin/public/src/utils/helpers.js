import yaml from 'js-yaml';
import _ from 'underscore';
import cloneDeep from 'lodash/cloneDeep';

const DATE_FILENAME_MATCHER = /^(?:.+\/)*(\d+-\d+-\d+)-(.*)(\.[^.]+)$/;

/**
 * Converts the object into YAML string.
 * @param {Object} object
 * @return {String} yaml
 */
export const toYAML = (obj) =>
  (!_.isEmpty(obj)) ? yaml.safeDump(obj, {indent:2}) : '';

/**
 * Converts the YAML string into JS object.
 * @param {String} string
 * @return {Object} obj
 */
export const toJSON = (yamlString) =>
  (yamlString ? yaml.load(yamlString) : {});

/**
 * Capitalize the given string.
 * @param {String} string
 * @return {String} string
 */
export const capitalize = (string) => {
  if(string)
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  return '';
};

// metafields

/**
 * Returns the metadata of the state with the new empty field. If the field does
 * not exist, returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @return {Object} metadata
 */
export const addField = (state, namePrefix) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.isArray(field)) field.push('');
  else field['New field ' + state.new_field_count] = '';
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the removed key. If the field does not
 * exist, returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} key
 * @return {Object} metadata
 */
export const removeField = (state, namePrefix, key) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.isArray(field)) {
    if (key >= field.length) {
      return tmpState.metadata;
    }
    field.splice(key, 1);
  }
  else {
    if (!_.has(field, key)) {
      return tmpState.metadata;
    }
    delete field[key];
  }
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the updated key. If the field does not
 * exist or the key already exists, returns the original metadata. Does not
 * mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {String} fieldKey
 * @param {String} newKey
 * @return {Object} metadata
 */
export const updateFieldKey = (state, namePrefix, fieldKey, newKey) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.has(field, newKey)) return tmpState.metadata;
  field = Object.keys(field)
    .reduce((result, current) => {
      if (current == fieldKey) result[newKey] = field[current];
      else result[current] = field[current];
      return result;
    }, {});
  eval(`tmpState.${namePrefix} = field`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the updated value of given path(nameAttr).
 * If the field does not exist, creates a new field. Does not mutate the given state.
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} value
 * @return {Object} metadata
 */
export const updateFieldValue = (state, nameAttr, value) => {
  let tmpState = cloneDeep(state);
  eval(`tmpState.${nameAttr} = value`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the converted type of given path(nameAttr).
 * If the field does not exist, returns the original metadata.
 * Does not mutate the given state.
 * @param {Object} state
 * @param {String} nameAttr
 * @param {String} convertType
 * @return {Object} metadata
 */
export const convertField = (state, nameAttr, convertType) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${nameAttr}`);
  if (field === undefined) return tmpState.metadata;
  if (convertType == 'array') field = [''];
  else if (convertType == 'object') {
    let key = 'New field ' + state.new_field_count;
    field = { [key]: '' };
  }
  else field = '';
  eval(`tmpState.${nameAttr} = field`);
  return tmpState.metadata;
};

/**
 * Returns the metadata of the state with the sorted array. Moves the array item to
 * target index, shifts the rest of them. If the given path is not an array,
 * returns the original metadata. Does not mutate the given state.
 * @param {Object} state
 * @param {String} namePrefix
 * @param {Number} srcInd
 * @param {Number} targetInd
 * @return {Object} metadata
 */
export const moveArrayItem = (state, namePrefix, srcInd, targetInd) => {
  let tmpState = cloneDeep(state);
  let arr = eval(`tmpState.${namePrefix}`);
  if (!_.isArray(arr)) return tmpState.metadata;
  arr.splice(targetInd, 0, arr.splice(srcInd, 1)[0]);
  return tmpState.metadata;
};

// form

/**
 * Returns error messages if the given values does not pass the provided validators.
 * @param {Array} values
 * @param {Object} validators
 * @param {Object} errors
 * @return {Array} errorMessages
 */
export const validateForm = (content, collection_name) => {
  let errorMessages = [];
  if (!content.title) {
    errorMessages.push('The title field is required.');
  }
  if (content.path) {
    if (collection_name == 'posts' && !DATE_FILENAME_MATCHER.test(content.path)) {
      errorMessages.push('The filename is not valid.');
    }
  }else {
    errorMessages.push('The filename is required.');
  }
  return errorMessages;
};
