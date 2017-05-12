import React from 'react';
import { mount } from 'enzyme';

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
    storeContentFields: jest.fn(),
    addField: jest.fn(),
    removeField: jest.fn(),
    updateFieldKey: jest.fn(),
    changeFieldValue: jest.fn(),
    updateFieldValue: jest.fn(),
    moveArrayItem: jest.fn(),
    convertField: jest.fn()
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
    let { component, addFieldButton, addDataFieldButton } = setup();

    expect(component.find('div').first().hasClass('metafields')).toEqual(true);
    expect(addFieldButton.node).toBeTruthy();
    expect(addDataFieldButton.node).not.toBeTruthy();

    const updatedSetup = setup(Object.assign({}, defaultProps, {
      dataview: true
    }));

    expect(
      updatedSetup.component.find('div').first().hasClass('datafields')
    ).toEqual(true);
    expect(updatedSetup.addFieldButton.node).not.toBeTruthy();
    expect(updatedSetup.addDataFieldButton.node).toBeTruthy();

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
