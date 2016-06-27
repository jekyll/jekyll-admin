import expect from 'expect';
import reducer from '../metadata';
import * as types from '../../constants/actionTypes';
import _ from 'underscore';

import { meta } from './fixtures';

describe('Reducers::Metadata', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      title: '',
      body: '',
      path: '',
      published: true,
      metadata: {},
      new_field_count: 1,
      key_prefix: '',
      fieldChanged: false
    });
  });

  it('should reset fieldChanged', () => {
    expect(reducer({fieldChanged: true}, {})).toEqual({
      fieldChanged: false
    });
  });

  it('should handle storeContentFields', () => {
    expect(
      reducer({}, {
        type: types.STORE_CONTENT_FIELDS,
        content: {
          body: "Test body",
          meta: {
            title: "Title",
            path: "Path",
            published: false,
            ...meta
          }
        }
      })
    ).toEqual({
      title: "Title",
      body: "Test body",
      path: "Path",
      published: false,
      metadata: meta
    });
  });

  it('should handle addField', () => {
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.ADD_METAFIELD,
        namePrefix: 'metadata["notexists"]'
      })
    ).toEqual({
      metadata: meta,
      new_field_count: 1
    });
    expect(
      reducer({ metadata : meta, new_field_count: 1 }, {
        type: types.ADD_METAFIELD,
        namePrefix: 'metadata'
      })
    ).toEqual({
      metadata: {
        ...meta,
        'New field 1': ''
      },
      new_field_count: 2
    });
    expect(
      reducer({ metadata : meta, new_field_count: 1 }, {
        type: types.ADD_METAFIELD,
        namePrefix: 'metadata["students"]'
      })
    ).toEqual({
      metadata: {
        ...meta,
        students: [
          ...meta.students,
          ''
        ]
      },
      new_field_count: 2
    });
  });

  it('should handle removeField', () => {
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.REMOVE_METAFIELD,
        namePrefix: 'metadata["notexists"]'
      })
    ).toEqual({
      metadata: meta,
      new_field_count: 0,
      fieldChanged: true
    });
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.REMOVE_METAFIELD,
        namePrefix: 'metadata["students"][0]',
        key: 'email'
      })
    ).toEqual({
      metadata: {
        ...meta,
        students: [
          _.omit(meta.students[0], 'email'),
          ...meta.students.slice(1)
        ]
      },
      new_field_count: 0,
      fieldChanged: true
    });
  });

  it('should handle updateFieldKey', () => {
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.UPDATE_FIELD_KEY,
        namePrefix: 'metadata["notexists"]',
        fieldKey: 'key',
        newKey: 'new key'
      })
    ).toEqual({
      metadata: meta,
      new_field_count: 0,
      fieldChanged: true
    });
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.UPDATE_FIELD_KEY,
        namePrefix: 'metadata',
        fieldKey: 'layout',
        newKey: 'new_layout'
      })
    ).toEqual({
      metadata: {
        ..._.omit(meta, 'layout'),
        new_layout: meta.layout
      },
      new_field_count: 0,
      fieldChanged: true
    });
  });

  it('should handle updateFieldValue', () => {
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.UPDATE_FIELD_VALUE,
        nameAttr: 'metadata["notexists"]',
        value: 'willExist'
      })
    ).toEqual({
      metadata: {
        ...meta,
        notexists: 'willExist'
      },
      new_field_count: 0,
      fieldChanged: true
    });
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.UPDATE_FIELD_VALUE,
        nameAttr: 'metadata["layout"]',
        value: 'post2'
      })
    ).toEqual({
      metadata: {
        ...meta,
        layout: 'post2'
      },
      new_field_count: 0,
      fieldChanged: true
    });
  });

  it('should handle moveArrayItem', () => {
    expect(
      _.omit(reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.MOVE_ARRAY_ITEM,
        namePrefix: 'metadata["layout"]',
        srcInd: 0,
        targetInd: 2
      }), 'key_prefix') // because random!!
    ).toEqual({
      metadata: meta,
      new_field_count: 0,
      fieldChanged: true
    });
    expect(
      _.omit(reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.MOVE_ARRAY_ITEM,
        namePrefix: 'metadata["mentors"]',
        srcInd: 0,
        targetInd: 2
      }), 'key_prefix') // because random!!
    ).toEqual({
      metadata: {
        ...meta,
        mentors: [
          ...meta.mentors.slice(1),
          meta.mentors[0]
        ]
      },
      new_field_count: 0,
      fieldChanged: true
    });
  });

  it('should handle convertField', () => {
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.CONVERT_FIELD,
        nameAttr: 'metadata["notexists"]',
        convertType: 'array'
      })
    ).toEqual({
      metadata: meta,
      new_field_count: 1,
      fieldChanged: true
    });
    expect(
      reducer({ metadata : meta, new_field_count: 0 }, {
        type: types.CONVERT_FIELD,
        nameAttr: 'metadata',
        convertType: 'array'
      })
    ).toEqual({
      metadata: [''],
      new_field_count: 1,
      fieldChanged: true
    });
    expect(
      reducer({ metadata : meta, new_field_count: 2 }, {
        type: types.CONVERT_FIELD,
        nameAttr: 'metadata["mentors"]',
        convertType: 'object'
      })
    ).toEqual({
      metadata: {
        ...meta,
        mentors: {'New field 2': ''}
      },
      new_field_count: 3,
      fieldChanged: true
    });
  });

});
