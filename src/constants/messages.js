// inline messages
export const getDeleteMessage = (filename) =>
  `Are you sure that you want to delete "${filename}" ?`;

export const getLeaveMessage = () =>
  "You have unsaved changes on this page. Are you sure you want to leave?";

export const getNotFoundMessage = (type) =>
  `No ${type} found.`;

export const getOverrideMessage = (filename) =>
  `${filename} will be overwritten. Continue anyway?`;

// notification messages
export const getParserErrorMessage = () => "Parse Error";

export const getSuccessMessage = () => "Success";

export const getErrorMessage = () => "Error";

export const getUploadSuccessMessage = (filename) =>
  `${filename} uploaded successfully`;

export const getUploadErrorMessage = () =>
  `Error occurred uploading the file.`;

export const getFetchErrorMessage = (filename) =>
  `Could not fetch the ${filename}`;

export const getUpdateErrorMessage = (filename) =>
  `Could not update the ${filename}`;

export const getDeleteErrorMessage = (filename) =>
  `Could not delete the ${filename}`;

// validation messages
export const getTitleRequiredMessage = () =>
  "The title is required.";

export const getFilenameRequiredMessage = () =>
  "The filename is required.";

export const getFilenameNotValidMessage = () =>
  "The filename is not valid.";
