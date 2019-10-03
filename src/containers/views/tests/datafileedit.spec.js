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
  params: { splat: ['movies', 'actors', 'yml'] },
  errors: [],
  isFetching: false,
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchDataFile: jest.fn(),
    putDataFile: jest.fn(),
    deleteDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn(),
  };

  const component = shallow(<DataFileEdit {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find(Button).first(),
    toggleButton: component.find(Button).at(1),
    deleteButton: component.find(Button).last(),
    errors: component.find(Errors),
    props,
  };
};

describe('Containers::DataFileEdit', () => {
  it('should render correctly', () => {
    let { component } = setup({ ...defaultProps, isFetching: true });
    component = setup({ ...defaultProps, datafile: {} }).component;
    expect(component.find('h1').node).toBeTruthy();
  });

  it('should not render error messages initially', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages', () => {
    const { errors } = setup({
      ...defaultProps,
      errors: ['The content is required!'],
    });
    expect(errors.node).toBeTruthy();
  });

  it('should not call clearErrors on unmount if there are no errors.', () => {
    const { component, errors, actions } = setup();
    component.unmount();
    expect(actions.clearErrors).not.toHaveBeenCalled();
  });

  it('should clear errors on unmount.', () => {
    const { component, errors, actions } = setup({
      ...defaultProps,
      errors: ['The content is required!'],
    });
    component.unmount();
    expect(actions.clearErrors).toHaveBeenCalled();
  });

  it('should toggle views.', () => {
    const { component, toggleButton } = setup();
    expect(component.state('guiView')).toBe(false);
    toggleButton.simulate('click');
    expect(component.state('guiView')).toBe(true);
  });

  it('should update state on switch to GUI mode', () => {
    const { component, toggleButton, actions } = setup();
    expect(component.state()).toEqual({
      guiPath: '',
      extn: '',
      guiView: false,
    });
    toggleButton.simulate('click');
    expect(component.state()).toEqual({
      guiPath: 'authors',
      extn: '.yml',
      guiView: true,
    });
  });

  it('should call putDataFile after datafileChanged in GUI mode', () => {
    const { component, toggleButton, saveButton, actions } = setup({
      ...defaultProps,
      datafileChanged: true,
    });
    toggleButton.simulate('click');
    saveButton.simulate('click');
    expect(actions.putDataFile).toHaveBeenCalledWith(
      'movies',
      'actors.yml',
      null,
      '_data/movies/authors.yml',
      'gui'
    );
  });

  it('should call putDataFile with different splats and datafileChanged in GUI mode', () => {
    const { component, toggleButton, saveButton, actions } = setup({
      ...defaultProps,
      params: { splat: ['', 'authors', 'yml'] },
      datafileChanged: true,
    });
    toggleButton.simulate('click');
    saveButton.simulate('click');
    expect(actions.putDataFile).toHaveBeenCalledWith(
      '',
      'authors.yml',
      null,
      '_data/authors.yml',
      'gui'
    );
  });

  it('should call putDataFile after fieldChanged in GUI mode', () => {
    const { component, toggleButton, saveButton, actions } = setup({
      ...defaultProps,
      datafile: datafile,
      params: { splat: ['books', 'authors', 'yml'] },
      fieldChanged: true,
    });
    toggleButton.simulate('click');
    saveButton.simulate('click');
    expect(actions.putDataFile).toHaveBeenCalledWith(
      'books',
      'authors.yml',
      null,
      '',
      'gui'
    );
  });

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile).not.toHaveBeenCalled(); // TODO pass prompt
  });

  it('should recieve updated props', () => {
    const { component, actions } = setup();
    component.setProps({
      params: { splat: ['books', 'authors', 'yml'] },
      updated: true,
    });
    expect(component.instance().props['datafile']['path']).toEqual(
      '_data/books/authors.yml'
    );
  });
});
