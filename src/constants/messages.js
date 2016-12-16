export const getDeleteMessage = (filename) =>
  `Are you sure that you want to delete "${filename}" ?`;

export const getLeaveMessage = () =>
  "You have unsaved changes on this page. Are you sure you want to leave?";

export const getNotFoundMessage = (type) =>
  `No ${type} found.`;

export const getOverrideMessage = (filename) =>
  `${filename} will be overwritten. Continue anyway?`;
