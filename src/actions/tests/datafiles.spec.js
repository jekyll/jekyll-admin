import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../datafiles';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import { datafile } from './fixtures';

describe('Actions::Datafiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches data files successfully', () => {
    nock(API)
      .get('/data/')
      .reply(200, [datafile]);

    const expectedActions = [
      { type: types.FETCH_DATAFILES_REQUEST },
      { type: types.FETCH_DATAFILES_SUCCESS, files: [datafile] }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.fetchDataFiles())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches data files from directories successfully', () => {
    nock(API)
      .get('/data/movies/')
      .reply(200, [datafile]);

    const expectedActions = [
      { type: types.FETCH_DATAFILES_REQUEST },
      { type: types.FETCH_DATAFILES_SUCCESS, files: [datafile] }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.fetchDataFiles('movies/'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FETCH_DATAFILES_FAILURE when fetching datafiles failed', () => {
    nock(API)
      .get('/data')
      .replyWithError('Something gone wrong');

    const expectedActions = [
      { type: types.FETCH_DATAFILES_REQUEST },
      { type: types.FETCH_DATAFILES_FAILURE }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.fetchDataFiles())
      .then(() => { // return of async actions
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('fetches a data file successfully', () => {
    nock(API)
      .get('/data/data_file.yml')
      .reply(200, datafile);

    const expectedActions = [
      { type: types.FETCH_DATAFILE_REQUEST },
      { type: types.FETCH_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.fetchDataFile(null, 'data_file.yml'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('fetches a data file from a subdirectory successfully', () => {
    nock(API)
      .get('/data/movies/actors.yml')
      .reply(200, datafile);

    const expectedActions = [
      { type: types.FETCH_DATAFILE_REQUEST },
      { type: types.FETCH_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.fetchDataFile('movies', 'actors.yml'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FETCH_DATAFILE_FAILURE when fetching a datafile failed', () => {
    nock(API)
      .get('/data/data_file.yml')
      .replyWithError('Something gone wrong');

    const expectedActions = [
      { type: types.FETCH_DATAFILE_REQUEST },
      { type: types.FETCH_DATAFILE_FAILURE }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.fetchDataFile('data_file.yml'))
      .then(() => { // return of async actions
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('updates a data file successfully', () => {
    nock(API)
      .put('/data/data_file.json', { raw_content: { foo: "bar" } } )
      .reply(200, datafile);

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.putDataFile(null, 'data_file.json', { foo: "bar" }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('updates a file successfully from the GUI editor', () => {
    nock(API)
      .put('/data/data_file.json')
      .reply(200, datafile);

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({metadata: { metadata: datafile }});

    return store.dispatch(actions.putDataFile(null, 'data_file.json', null, '_data/new_data_file.yml', 'gui'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('updates a yaml file successfully from the GUI editor', () => {
    nock(API)
      .put('/data/data_file.yaml')
      .reply(200, datafile);

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({metadata: { metadata: datafile }});

    return store.dispatch(actions.putDataFile(null, 'data_file.yaml', null, null, 'gui'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('updates a json file successfully from the GUI editor', () => {
    nock(API)
      .put('/data/data_file.json')
      .reply(200, datafile);

    const expectedAction = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_DATAFILE_SUCCESS, file: datafile }
    ];

    const store = mockStore({metadata: { metadata: datafile }});

    return store.dispatch(actions.putDataFile(null, 'data_file.json', null, null, 'gui'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('creates PUT_DATAFILE_FAILURE when updating a datafile failed', () => {
    nock(API)
      .put('/data/movies/actors.yml', datafile)
      .replyWithError('something awful happened');

    const expectedActions = [
      { type: types.CLEAR_ERRORS },
      { type: types.PUT_DATAFILE_FAILURE }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.putDataFile('movies', 'actors.yml', datafile))
      .then(() => { // return of async actions
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('deletes a data file successfully', () => {
    nock(API)
      .delete('/data/data_file.yml')
      .reply(200);

    const expectedAction = [
      { type: types.DELETE_DATAFILE_SUCCESS },
      { type: types.FETCH_DATAFILES_REQUEST }
    ];

    const store = mockStore({ files: [] });

    return store.dispatch(actions.deleteDataFile(null, 'data_file.yml'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('creates DELETE_DATAFILE_FAILURE when deleting a datafile failed', () => {
    nock(API)
      .delete('/data/data_file.yml')
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DELETE_DATAFILE_FAILURE
    };

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.deleteDataFile('data_file.yml'))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

  it('creates VALIDATION_ERROR if required field is not provided.', () => {
    const expectedActions = [
      {
        type: types.VALIDATION_ERROR,
        errors: [
          'The filename is required.',
          'The content is required.'
        ]
      }
    ];

    const store = mockStore({currentFile: {}});

    store.dispatch(actions.putDataFile());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DATAFILE_CHANGED when the content in editor is changed', () => {
    const expectedAction = [
      {
        type: types.DATAFILE_CHANGED
      }
    ];

    const store = mockStore({ config: {} });

    store.dispatch(actions.onDataFileChanged());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
