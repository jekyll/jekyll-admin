import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import _ from 'underscore';

import { MetaFields } from '../MetaFields';
import MetaField from '../../components/metadata/MetaField';
import { content } from './fixtures';

const defaultProps = {
  fields: content,
  metadata: content,
  key_prefix: ''
};

function setup(props=defaultProps) {
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
    <MetaFields {...props} {...actions} />
  );

  return {
    component,
    addFieldButton: component.find('.meta-new a'),
    addDataFieldButton: component.find('.data-new a'),
    metafields: component.find(MetaField),
    actions: actions
  };
}

describe('Containers::MetaFields', () => {
  it('should render MetaFields correctly', () => {
    let { component, metafields, addFieldButton, addDataFieldButton } = setup();

    expect(component.find('div').first().hasClass('metafields')).toEqual(true);
    expect(addFieldButton.node).toExist();
    expect(addDataFieldButton.node).toNotExist();

    const updatedSetup = setup(Object.assign({}, defaultProps, {
      dataview: true
    }));

    expect(
      updatedSetup.component.find('div').first().hasClass('datafields')
    ).toEqual(true);
    expect(updatedSetup.addFieldButton.node).toNotExist();
    expect(updatedSetup.addDataFieldButton.node).toExist();

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
