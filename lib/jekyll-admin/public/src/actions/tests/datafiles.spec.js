import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../datafiles';
import * as types from '../../constants/actionTypes';
import { API } from '../../constants/api';
import nock from 'nock';
import expect from 'expect';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions::Datafiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches data files successfully', () => {
    const datafiles = { data_file: { foo: 'bar' } };
    nock(API)
      .get('/data')
      .reply(200, datafiles);

    const expectedActions = [
      { type: types.FETCH_DATAFILES_REQUEST },
      { type: types.FETCH_DATAFILES_SUCCESS, datafiles }
    ];

    const store = mockStore({ datafiles: {} });

    return store.dispatch(actions.fetchDataFiles())
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

    const store = mockStore({ datafiles: {} });

    return store.dispatch(actions.fetchDataFiles())
      .then(() => { // return of async actions
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('fetches a data file successfully', () => {
    const datafile = { foo: 'bar' };
    nock(API)
      .get('/data/data_file')
      .reply(200, datafile);

    const expectedActions = [
      { type: types.FETCH_DATAFILE_REQUEST },
      { type: types.FETCH_DATAFILE_SUCCESS, datafile }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.fetchDataFile('data_file'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FETCH_DATAFILE_FAILURE when fetching a datafile failed', () => {
    nock(API)
      .get('/data/data_file')
      .replyWithError('Something gone wrong');

    const expectedActions = [
      { type: types.FETCH_DATAFILE_REQUEST },
      { type: types.FETCH_DATAFILE_FAILURE }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.fetchDataFile('data_file'))
      .then(() => { // return of async actions
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      });
  });

  it('updates a data file successfully', () => {
    const datafile = { foo: 'bar' };
    nock(API)
      .put('/data/data_file', datafile)
      .reply(200, datafile);

    const expectedAction = [
      { type: types.PUT_DATAFILE_SUCCESS, datafile }
    ];

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.putDataFile('data_file', datafile))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('creates PUT_DATAFILE_FAILURE when updating a datafile failed', () => {
    const datafile = { foo: 'bar' };
    nock(API)
      .put('/data/data_file', datafile)
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.PUT_DATAFILE_FAILURE
    };

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.putDataFile('data_file', datafile))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

  it('deletes a data file successfully', () => {
    nock(API)
      .delete('/data/data_file')
      .reply(200);

    const expectedAction = [
      { type: types.DELETE_DATAFILE_SUCCESS, id: 'data_file' }
    ];

    const store = mockStore({ datafiles: {} });

    return store.dispatch(actions.deleteDataFile('data_file'))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('creates DELETE_DATAFILE_FAILURE when deleting a datafile failed', () => {
    nock(API)
      .delete('/data/data_file')
      .replyWithError('something awful happened');

    const expectedAction = {
      type: types.DELETE_DATAFILE_FAILURE
    };

    const store = mockStore({ currentFile: {} });

    return store.dispatch(actions.deleteDataFile('data_file'))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).toEqual(expectedAction.type);
      });
  });

});
