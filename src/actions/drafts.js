import * as ActionTypes from '../constants/actionTypes';
import _ from 'underscore';
import { validationError } from '../actions/utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, trimObject } from '../utils/helpers';
import { getTitleRequiredMessage, getFilenameNotValidMessage } from '../constants/lang';
import { draftsAPIUrl, draftAPIUrl } from '../constants/api';

export function fetchDrafts(directory = '') {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DRAFTS_REQUEST});
    return get(
      draftsAPIUrl(directory),
      { type: ActionTypes.FETCH_DRAFTS_SUCCESS, name: 'drafts'},
      { type: ActionTypes.FETCH_DRAFTS_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function fetchDraft(directory, filename) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_DRAFT_REQUEST});
    return get(
      draftAPIUrl(directory, filename),
      { type: ActionTypes.FETCH_DRAFT_SUCCESS, name: 'draft'},
      { type: ActionTypes.FETCH_DRAFT_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function putDraft(mode, directory, filename = '') {
  return (dispatch, getState) => {
    // get edited fields from metadata state
    const metadata = getState().metadata.metadata;
    let { path, raw_content, title } = metadata;

    // if path is not given or equals to directory, generate filename from the title
    if (!path && title) {
      path = `${slugify(title)}.md`;
    } else if (!path && !title) {
      return dispatch(
        validationError(validateDraft(metadata))
      );
    }
    // clear errors
    dispatch({type: ActionTypes.CLEAR_ERRORS});

    // omit raw_content, path and empty-value keys in metadata state from front_matter
    const front_matter = _.omit(metadata, (value, key, object) => {
      return key == 'raw_content' || key == 'path' || value === '';
    });

    let payload;
    if (mode == 'create') {
      // strip '_drafts/' from path when provided
      filename = path.replace('_drafts/', '');
      payload = { front_matter, raw_content };
    } else {
      let writePath = directory ? `_drafts/${directory}/${path}` :
        `_drafts/${path}`;
      payload = { path: writePath, front_matter, raw_content };
    }

    //send the put request
    return put(
      draftAPIUrl(directory, filename),
      preparePayload(payload),
      { type: ActionTypes.PUT_DRAFT_SUCCESS, name: 'draft'},
      { type: ActionTypes.PUT_DRAFT_FAILURE, name: 'error'},
      dispatch
    );
  };
}

export function deleteDraft(directory, filename) {
  return (dispatch) => {
    return fetch(draftAPIUrl(directory, filename), {
      method: 'DELETE'
    })
    .then(data => {
      dispatch({ type: ActionTypes.DELETE_DRAFT_SUCCESS });
      dispatch(fetchDrafts(directory));
    })
    .catch(error => dispatch({
      type: ActionTypes.DELETE_DRAFT_FAILURE,
      error
    }));
  };
}

const validateDraft = (metadata) => {
  return validator(
    metadata,
    { 'path': 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage()
    }
  );
};

const preparePayload = (obj) => JSON.stringify(trimObject(obj));
