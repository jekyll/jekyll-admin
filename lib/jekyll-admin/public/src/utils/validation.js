import _ from 'underscore';

const DATE_FILENAME_MATCHER = /^(?:.+\/)*(\d+-\d+-\d+)-(.*)(\.[^.]+)$/;

/*
{
  'title' : '',
  'path' : '232323'
},
{
  'title': 'required',
  'path': 'required|date'
},
{
  'title': 'The title field is required'
}
*/

/**
 * Returns error messages if the given values does not pass the provided validators.
 * @param {Array} values
 * @param {Object} validators
 * @param {Object} messages
 * @return {Array} errorMessages
 */
export const validator = (values, validations, messages) => {
  let errorMessages = [];
  _.each(validations, (validationStr, field, list) => {
    const validationArr = validationStr.split('|');
    _.each(validationArr, (single) => {
      if (!validated(values[field], single)) {
        errorMessages.push(messages[`${field}.${single}`]);
      }
    });
  });
  return errorMessages;
};

const validated = (field, single) => {
  switch (single) {
    case 'required':
      return !!field;
    case 'date':
      return DATE_FILENAME_MATCHER.test(field);
    default:
      return false;
  }
};
