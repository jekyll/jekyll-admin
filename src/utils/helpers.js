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
