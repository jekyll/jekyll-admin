import yaml from 'js-yaml';
import _ from 'underscore';

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

/**
 * Convert the given string into title case format.
 * @param {String} string
 * @return {String} string
 */
export const toTitleCase = (string) => {
  if(string)
    return string.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  return '';
};

/**
 * Slugify the given string
 * @param {String} string
 * @return {String} string
 */
export const slugify = (string) => {
  if (string) {
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  return '';
};

/**
 * returns the uploaded static files that are being overwritten
 * @param {Array} uploadedFiles
 * @param {Array} currentFiles
 * @return {Array} filenames
 */
export const existingUploadedFilenames = (uploadedFiles, currentFiles) => {
  if ((uploadedFiles && !uploadedFiles.length) || (currentFiles && !currentFiles.length)) return [];
  const currentFilenames = _.map(currentFiles, cf => {
    return cf.path.substring(cf.path.lastIndexOf('/') + 1);
  });
  return _.chain(uploadedFiles)
    .filter(file => {
      return currentFilenames.indexOf(file.name) > -1;
    })
    .map(file => file.name).value();
};
