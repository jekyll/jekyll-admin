import React from 'react';
import { shallow } from 'enzyme';

import { DataFileEdit } from '../DataFileEdit';
import Errors from '../../../components/Errors';
import Button from '../../../components/Button';
import { datafile } from './fixtures';

const defaultProps = {
  datafile: datafile,
  updated: false,
  datafileChanged: false,
  fieldChanged: false,
  router: {},
  route: {},
  params: { splat: ["movies", "actors", "yml"]},
  errors: [],
  isFetching: false
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchDataFile: jest.fn(),
    putDataFile: jest.fn(),
    deleteDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn()
  };

  const component = shallow(<DataFileEdit {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find(Button).first(),
    deleteButton: component.find(Button).last(),
    errors: component.find(Errors),
    props
  };
};

describe('Containers::DataFileEdit', () => {
  it('should render correctly', () => {
    let { component } = setup(Object.assign(
      {}, defaultProps, { isFetching: true }
    ));
    component = setup(Object.assign(
      {}, defaultProps, { datafile: {} }
    )).component;
    expect(component.find('h1').node).toBeTruthy();
  });

  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup(Object.assign({}, defaultProps, {
      errors: ['The content is required!']
    }));
    expect(errors.node).toBeTruthy();
  });

  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).not.toHaveBeenCalled();
  });

  it('should call putDataFile if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      fieldChanged: true
    }));
    saveButton.simulate('click');
    expect(actions.putDataFile).toHaveBeenCalled();
  });

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile).not.toHaveBeenCalled(); // TODO pass prompt
  });
});
