import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import _ from 'underscore';

import MetaObject from '../MetaObject';
import MetaObjectItem from '../MetaObjectItem';

const defaultProps = {
  fieldKey: 'organization',
  fieldValue: {
    name: 'github',
    site: 'github.com'
  },
  nameAttr: 'metadata["organization"]',
  namePrefix: 'metadata',
  key_prefix: ''
};

function setup(props = defaultProps) {
  const actions = {
    addField: expect.createSpy(),
    removeField: expect.createSpy(),
    updateFieldKey: expect.createSpy(),
    updateFieldValue: expect.createSpy(),
    moveArrayItem: expect.createSpy(),
    convertField: expect.createSpy()
  };

  let component = mount(
    <MetaObject {...props} {...actions} />
  );

  return {
    component,
    objectitems: component.find(MetaObjectItem),
    addFieldButton: component.find('.add-field-object'),
    actions,
    props
  };
}

describe('Components::MetaObject', () => {
  it('should render MetaObject correctly', () => {
    const { objectitems } = setup();
    expect(objectitems.length).toEqual(_.keys(defaultProps.fieldValue).length);
  });

  it('should call addField when the button is clicked', () => {
    const { actions, addFieldButton } = setup();
    addFieldButton.simulate('click');
    expect(actions.addField).toHaveBeenCalled();
  });
});
