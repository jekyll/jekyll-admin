import React from 'react';
import { shallow } from 'enzyme';

import { DataFileNew } from '../DataFileNew';

import Button from '../../../components/Button';

const defaultProps = {
  datafile: {},
  updated: false,
  datafileChanged: false,
  editorChanged: false,
  router: {},
  route: {},
  params: { splat: 'books' },
  errors: []
};

const setup = (props = defaultProps) => {
  const actions = {
    putDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn()
  };

  const component = shallow(<DataFileNew {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find(Button),
    props
  };
};

describe('Containers::DataFileNew', () => {
  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).not.toHaveBeenCalled();
  });

  it('should call activate save button if a field is changed.', () => {
    const { saveButton } = setup(Object.assign({}, defaultProps, {
      datafileChanged: true
    }));
    expect(saveButton.prop('active')).toBe(true);
  });
});
