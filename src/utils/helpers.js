import cloneDeepWith from 'lodash/cloneDeepWith';

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
export const generateInputTreeFromFrontmatter = frontmatter => {
  const values = {};
  cloneDeepWith(frontmatter, (val, key, obj, stack) => {
    console.log(key, val);
  });
};
