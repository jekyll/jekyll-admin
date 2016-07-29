import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { DocumentNew } from '../DocumentNew';

import { doc } from './fixtures';

const defaultProps = {
  errors: [],
  fieldChanged: false,
  updated: false,
  params: { collection_name: doc.collection }
};

function setup(props = defaultProps) {
  const actions = {
    putDocument: expect.createSpy(),
    updateTitle: expect.createSpy(),
    updateBody: expect.createSpy(),
    updatePath: expect.createSpy(),
    updateDraft: expect.createSpy(),
    clearErrors: expect.createSpy()
  };

  let component = shallow(
    <DocumentNew {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a'),
    errors: component.find('.error-messages'),
    props
  };
}

describe('Containers::DocumentNew', () => {
  it('should call clearErrors before mount', () => {
    const { actions } = setup();

    expect(actions.clearErrors).toHaveBeenCalled();
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
});
