import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

/**
 * Capitalize the given string.
 * @param {String} string
 * @return {String} string
 */
export const capitalize = string => {
  return string
    ? string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
    : '';
};

/**
 * Generate input tree to be used in forms from given object
 * @param {String} json
 * @return {Array} tree
 */
export const generateInputTreeFromJSON = json => {
  const object = JSON.parse(json);
};

var tree = [
  {
    name: 'test',
    type: 'text',
    value: 'Test',
  },
  {
    name: 'test2',
    type: 'array',
    value: [
      {
        name: 'test21',
        type: 'text',
        value: 'Test 2.1',
      },
      {
        name: 'test22',
        type: 'text',
        value: 'Test 2.2',
      },
    ],
  },
  {
    name: 'test3',
    type: 'object',
    value: {
      name: 'test31',
      value: 'Test 3.1',
    },
  },
];
