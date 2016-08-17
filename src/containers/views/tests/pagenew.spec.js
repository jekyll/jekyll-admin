import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { PageNew } from '../PageNew';

import { page } from './fixtures';

const defaultProps = {
  errors: [],
  fieldChanged: false,
  updated: false
};

function setup(props = defaultProps) {
  const actions = {
    putPage: expect.createSpy(),
    updateTitle: expect.createSpy(),
    updateBody: expect.createSpy(),
    updatePath: expect.createSpy(),
    updateDraft: expect.createSpy(),
    clearErrors: expect.createSpy()
  };

  const component = shallow(
    <PageNew {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a'),
    errors: component.find('.error-messages'),
    props
  };
}

describe('Containers::PageNew', () => {
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
      errors: ['The path field is required!']
    }));
    expect(errors.node).toExist();
  });

  it('should not call putPage if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putPage).toNotHaveBeenCalled();
  });

  it('should call putPage if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.putPage).toHaveBeenCalled();
  });
});
