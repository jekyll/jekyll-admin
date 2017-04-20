import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from '../actions/utils';
import { get, put, del } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify } from '../utils/helpers';
import {
  getTitleRequiredMessage,
  getFilenameRequiredMessage,
  getFilenameNotValidMessage
} from '../constants/lang';
import {
  templatesAPIUrl,
  templateAPIUrl
} from '../constants/api';

export function fetchTemplates(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_TEMPLATES_REQUEST});
    return get(
      templatesAPIUrl(directory),
      { type: ActionTypes.FETCH_TEMPLATES_SUCCESS, name: "templates"},
      { type: ActionTypes.FETCH_TEMPLATES_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function fetchTemplate(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_TEMPLATE_REQUEST});
    return get(
      templateAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_TEMPLATE_SUCCESS, name: "template"},
      { type: ActionTypes.FETCH_TEMPLATE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function createTemplate(directory) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;
    // if path is not given or equals to directory, generate filename from the title
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else {
      const errors = validateTemplate(metadata);
      if (errors.length) {
        return dispatch(validationError(errors));
      }
    }
    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    // omit raw_content, path and empty-value keys in metadata state from front_matter
    const front_matter = _.omit(metadata, (value, key, object) => {
      return key == 'raw_content' || key == 'path' || value == '';
    });
    //send the put request
    return put(
      templateAPIUrl(directory, path),
      JSON.stringify({ front_matter, raw_content }),
      { type: ActionTypes.PUT_TEMPLATE_SUCCESS, name: "template"},
      { type: ActionTypes.PUT_TEMPLATE_FAILURE, name: "error"},
      dispatch
    );
  };
}

export function putTemplate(directory, filename) {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;
    // if path is not given or equals to directory, generate filename from the title
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else {
      const errors = validateTemplate(metadata);
      if (errors.length) {
        return dispatch(validationError(errors));
      }
    }
    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});
    // omit raw_content, path and empty-value keys in metadata state from front_matter
    const front_matter = _.omit(metadata, (value, key, object) => {
      return key == 'raw_content' || key == 'path' || value == '';
    });
    const relative_path = directory ?
      `${directory}/${path}` : `${path}`;
    //send the put request
    return put(
      // create or update template according to filename existence
      templateAPIUrl(directory, filename),
      JSON.stringify({ path: relative_path, front_matter, raw_content }),
      { type: ActionTypes.PUT_TEMPLATE_SUCCESS, name: "template"},
      { type: ActionTypes.PUT_TEMPLATE_FAILURE, name: "error"},
      dispatch
    );
  };
}

function validateTemplate(metadata) {
  return validator(
    metadata,
    { 'path': 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage()
    }
  );
}

export function deleteTemplate(directory, filename) {
  return (dispatch) => {
    return fetch(templateAPIUrl(directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_TEMPLATE_SUCCESS });
      dispatch(fetchTemplates(directory));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_TEMPLATE_FAILURE,
      error
    }));
  };
}
