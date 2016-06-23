import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import _ from 'underscore';

import { MetaFields } from '../index';
import MetaField from '../MetaField';

import { meta } from './fixtures';

function setup() {
  const actions = {
    setupMetadata: expect.createSpy(),
    addField: expect.createSpy(),
    removeField: expect.createSpy(),
    updateFieldKey: expect.createSpy(),
    updateFieldValue: expect.createSpy(),
    moveArrayItem: expect.createSpy(),
    convertField: expect.createSpy()
  };

  let component = mount(
    <MetaFields
      meta={meta}
      metadata={meta}
      key_prefix=""
      {...actions} />
  );

  return {
    component,
    addFieldButton: component.find('.meta-new a'),
    metafields: component.find(MetaField),
    actions: actions
  };
}

describe('Components::MetaFields', () => {
  it('should render MetaFields correctly', () => {
    const { component, metafields } = setup();
    expect(component.prop('key_prefix')).toBe('');
    expect(component.prop('metadata')).toEqual(meta);
    expect(metafields.length).toBe(_.keys(meta).length);
  });

  it('should call setupMetadata before mount', () => {
    const { actions } = setup();
    expect(actions.setupMetadata).toHaveBeenCalled();
  });

  it('should call addField when the button is clicked', () => {
    const { actions, addFieldButton } = setup();
    addFieldButton.simulate('click');
    expect(actions.addField).toHaveBeenCalled();
  });

});
