import _ from 'underscore';
import { CLEAR_ERRORS, validationError } from './utils';
import { get, put } from '../utils/fetch';
import { validator } from '../utils/validation';
import { slugify, trimObject } from '../utils/helpers';
import { draftsAPIUrl, draftAPIUrl } from '../constants/api';
import {
  getTitleRequiredMessage,
  getFilenameNotValidMessage,
} from '../translations';

export const FETCH_DRAFTS_REQUEST = 'FETCH_DRAFTS_REQUEST';
export const FETCH_DRAFTS_SUCCESS = 'FETCH_DRAFTS_SUCCESS';
export const FETCH_DRAFTS_FAILURE = 'FETCH_DRAFTS_FAILURE';

export const FETCH_DRAFT_REQUEST = 'FETCH_DRAFT_REQUEST';
export const FETCH_DRAFT_SUCCESS = 'FETCH_DRAFT_SUCCESS';
export const FETCH_DRAFT_FAILURE = 'FETCH_DRAFT_FAILURE';

export const PUT_DRAFT_REQUEST = 'PUT_DRAFT_REQUEST';
export const PUT_DRAFT_SUCCESS = 'PUT_DRAFT_SUCCESS';
export const PUT_DRAFT_FAILURE = 'PUT_DRAFT_FAILURE';

export const DELETE_DRAFT_REQUEST = 'DELETE_DRAFT_REQUEST';
export const DELETE_DRAFT_SUCCESS = 'DELETE_DRAFT_SUCCESS';
export const DELETE_DRAFT_FAILURE = 'DELETE_DRAFT_FAILURE';

export const fetchDrafts = (directory = '') => dispatch => {
  dispatch({ type: FETCH_DRAFTS_REQUEST });
  return get(
    draftsAPIUrl(directory),
    { type: FETCH_DRAFTS_SUCCESS, name: 'drafts' },
    { type: FETCH_DRAFTS_FAILURE, name: 'error' },
    dispatch
  );
};

export const fetchDraft = (directory, filename) => dispatch => {
  dispatch({ type: FETCH_DRAFT_REQUEST });
  return get(
    draftAPIUrl(directory, filename),
    { type: FETCH_DRAFT_SUCCESS, name: 'draft' },
    { type: FETCH_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const putDraft = (mode, directory, filename = '') => (
  dispatch,
  getState
) => {
  // get edited fields from metadata state
  const metadata = getState().metadata.metadata;
  let { path, raw_content, title } = metadata;

  // if path is not given or equals to directory, generate filename from the title
  if (!path && title) {
    path = `${slugify(title)}.md`;
  } else if (!path && !title) {
    return dispatch(validationError(validateDraft(metadata)));
  }
  // clear errors
  dispatch({ type: CLEAR_ERRORS });

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
    let writePath = directory
      ? `_drafts/${directory}/${path}`
      : `_drafts/${path}`;
    payload = { path: writePath, front_matter, raw_content };
  }

  //send the put request
  return put(
    draftAPIUrl(directory, filename),
    preparePayload(payload),
    { type: PUT_DRAFT_SUCCESS, name: 'draft' },
    { type: PUT_DRAFT_FAILURE, name: 'error' },
    dispatch
  );
};

export const deleteDraft = (directory, filename) => dispatch => {
  return fetch(draftAPIUrl(directory, filename), {
    method: 'DELETE',
    credentials: 'same-origin',
  })
    .then(data => {
      dispatch({ type: DELETE_DRAFT_SUCCESS });
      dispatch(fetchDrafts(directory));
    })
    .catch(error =>
      dispatch({
        type: DELETE_DRAFT_FAILURE,
        error,
      })
    );
};

const validateDraft = metadata =>
  validator(
    metadata,
    { path: 'required|filename' },
    {
      'path.required': getTitleRequiredMessage(),
      'path.filename': getFilenameNotValidMessage(),
    }
  );

const preparePayload = obj => JSON.stringify(trimObject(obj));

export default function drafts(
  state = {
    drafts: [],
    draft: {},
    isFetching: false,
    updated: false,
  },
  action
) {
  switch (action.type) {
    case FETCH_DRAFTS_REQUEST:
    case FETCH_DRAFT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_DRAFTS_SUCCESS:
      return {
        ...state,
        drafts: action.drafts,
        isFetching: false,
        draft: {},
      };
    case FETCH_DRAFTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        drafts: [],
      };
    case FETCH_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.draft,
        isFetching: false,
      };
    case FETCH_DRAFT_FAILURE:
      return {
        ...state,
        draft: {},
        isFetching: false,
      };
    case PUT_DRAFT_SUCCESS:
      return {
        ...state,
        draft: action.draft,
        updated: true,
      };
    default:
      return {
        ...state,
        updated: false,
      };
  }
}

// Selectors
export const filterBySearchInput = (list, input) => {
  if (input) {
    return list.filter(p => p.name.toLowerCase().includes(input.toLowerCase()));
  }
  return list;
};
