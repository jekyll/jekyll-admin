import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { PageNew } from '../PageNew';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';

import { page } from './fixtures';

const defaultProps = {
  errors: [],
  fieldChanged: false,
  updated: false,
  router: {},
  route: {},
  config: {},
  params: { splat: 'page-dir' }
};

function setup(props = defaultProps) {
  const actions = {
    createPage: expect.createSpy(),
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
    saveButton: component.find(Button),
    errors: component.find(Errors),
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

  it('should not call createPage if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.createPage).toNotHaveBeenCalled();
  });

  it('should call createPage if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.createPage).toHaveBeenCalled();
  });
});
