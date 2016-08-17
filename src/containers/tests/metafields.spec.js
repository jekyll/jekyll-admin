import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import _ from 'underscore';

import { MetaFields } from '../MetaFields';
import MetaField from '../../components/metadata/MetaField';

import { content } from './fixtures';

function setup() {
  const actions = {
    storeContentFields: expect.createSpy(),
    addField: expect.createSpy(),
    removeField: expect.createSpy(),
    updateFieldKey: expect.createSpy(),
    updateFieldValue: expect.createSpy(),
    moveArrayItem: expect.createSpy(),
    convertField: expect.createSpy()
  };

  const component = mount(
    <MetaFields
      fields={content}
      metadata={content}
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

describe('Containers::MetaFields', () => {
  it('should render MetaFields correctly', () => {
    const { component, metafields } = setup();
    expect(component.prop('key_prefix')).toBe('');
    expect(component.prop('metadata')).toEqual(content);
  });
  it('should call storeContentFields before mount', () => {
    const { actions } = setup();
    expect(actions.storeContentFields).toHaveBeenCalled();
  });
  it('should call addField when the button is clicked', () => {
    const { actions, addFieldButton } = setup();
    addFieldButton.simulate('click');
    expect(actions.addField).toHaveBeenCalled();
  });
});
