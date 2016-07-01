import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { ContentEdit } from '../ContentEdit';
import Breadcrumbs from '../../Breadcrumbs';
import Checkbox from '../../form/Checkbox';

import { doc } from './fixtures';

const defaultProps = {
  contentType: "collections",
  content: doc,
  errors: [],
  fieldChanged: false,
  updated: false
};

function setup(props = defaultProps) {
  const actions = {
    storeContentFields: expect.createSpy(),
    updateContent: expect.createSpy(),
    updateTitle: expect.createSpy(),
    updateBody: expect.createSpy(),
    updatePath: expect.createSpy(),
    updateDraft: expect.createSpy(),
    deleteContent: expect.createSpy(),
    clearErrors: expect.createSpy()
  };

  let component = shallow(
    <ContentEdit {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a').first(),
    deleteButton: component.find('.content-side .delete'),
    checkbox: component.find(Checkbox),
    errors: component.find('.error-messages'),
    breadcrumbs: component.find(Breadcrumbs),
    props
  };
}

describe('Components::ContentEdit', () => {
  it('should call clearErrors before mount', () => {
    const { actions } = setup();
    expect(actions.clearErrors).toHaveBeenCalled();
  });
  it('should render correctly', () => {
    const { component, breadcrumbs, checkbox, props } = setup();
    expect(
      checkbox.prop('checked')
    ).toBe(doc.meta.published === undefined ? false : !doc.meta.published);
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
  it('should not call updateContent if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.updateContent).toNotHaveBeenCalled();
  });
  it('should call updateContent if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.updateContent).toHaveBeenCalled();
  });
  it('should call deleteContent', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteContent).toNotHaveBeenCalled(); // TODO pass prompt
  });
});
