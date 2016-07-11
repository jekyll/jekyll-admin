import React from 'react';
import { Link } from 'react-router';
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

  let component = mount(
    <MetaFields
      content={content}
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
    expect(metafields.length).toBe(
      _.keys(_.omit(content, ['content', 'path', 'title', 'draft'])).length
    );
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
