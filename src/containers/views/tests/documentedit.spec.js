import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { DocumentEdit } from '../DocumentEdit';

import { doc } from './fixtures';

const defaultProps = {
  currentDocument: doc,
  errors: [],
  fieldChanged: false,
  updated: false,
  isFetching: false,
  params: { id: "the-revenant", collection_name: "movies"}
};

function setup(props = defaultProps) {
  const actions = {
    fetchDocument: expect.createSpy(),
    putDocument: expect.createSpy(),
    deleteDocument: expect.createSpy(),
    updateTitle: expect.createSpy(),
    updateBody: expect.createSpy(),
    updatePath: expect.createSpy(),
    updateDraft: expect.createSpy(),
    clearErrors: expect.createSpy()
  };

  const component = shallow(
    <DocumentEdit {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a').first(),
    deleteButton: component.find('.content-side .delete'),
    errors: component.find('.error-messages'),
    props
  };
}

describe('Containers::DocumentEdit', () => {
  it('should call clearErrors before mount', () => {
    const { actions } = setup();
    expect(actions.clearErrors).toHaveBeenCalled();
  });

  it('should render correctly', () => {
    let { component } = setup(Object.assign(
      {}, defaultProps, { isFetching: true }
    ));
    component = setup(Object.assign(
      {}, defaultProps, { currentDocument: {} }
    )).component;
    expect(component.find('h1').node).toExist();
  });

  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toNotExist();
  });

  it('should render error messages', () => {
    const { errors } = setup(Object.assign({}, defaultProps, {
      errors: ['The title field is required!']
    }));
    expect(errors.node).toExist();
  });

  it('should not call putDocument if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDocument).toNotHaveBeenCalled();
  });

  it('should call putDocument if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.putDocument).toHaveBeenCalled();
  });

  it('should call deleteDocument', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDocument).toNotHaveBeenCalled(); // TODO pass prompt
  });
});
