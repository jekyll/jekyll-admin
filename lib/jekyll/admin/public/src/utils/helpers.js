import yaml from 'js-yaml';
import _ from 'underscore';
import cloneDeep from 'lodash/cloneDeep';

export const toYAML = (obj) =>
  (!_.isEmpty(obj)) ? yaml.safeDump(obj, {indent:2}) : '';

export const toJSON = (yamlString) =>
  (yamlString ? yaml.load(yamlString) : {});

export const capitalize = (string) => {
  if(string)
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  return '';
};

// metafields
export const addField = (state, namePrefix) => {
  let tmpState = cloneDeep(state);
  let field = eval(`tmpState.${namePrefix}`);
  if (field === undefined) return tmpState.metadata;
  if (_.isArray(field)) field.push('');
  else field['New field ' + state.new_field_count] = '';
  return tmpState.metadata;
};

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

export const updateFieldValue = (state, nameAttr, value) => {
  let tmpState = cloneDeep(state);
  eval(`tmpState.${nameAttr} = value`);
  return tmpState.metadata;
};

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

export const moveArrayItem = (state, namePrefix, srcInd, targetInd) => {
  let tmpState = cloneDeep(state);
  let arr = eval(`tmpState.${namePrefix}`);
  if (!_.isArray(arr)) return tmpState.metadata;
  arr.splice(targetInd, 0, arr.splice(srcInd, 1)[0]);
  return tmpState.metadata;
};

// form
export const validateForm = (values, validators, errors) => {
  let errorMessages = [];
  _.each(values, (value, key) => {
    if (validators[key] && !validate(value, validators[key])) {
      errorMessages.push(errors[key]);
    }
  });
  return errorMessages;
};

const validate = (value, validator) => {
  switch (validator) {
    case 'required':
      return value != '';
    case 'boolean':
      return _.isBoolean(value);
    default:
      return false;
  }
};
