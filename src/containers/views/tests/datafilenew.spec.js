import React from 'react';
import { shallow } from 'enzyme';
import { DataFileNew } from '../DataFileNew';
import Button from '../../../components/Button';
import Editor from '../../../components/Editor';
import Errors from '../../../components/Errors';
import DataGUI from '../../../containers/MetaFields';

const defaultProps = {
  datafile: {},
  updated: false,
  datafileChanged: false,
  editorChanged: false,
  router: {},
  route: {},
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
    toggleButton: component.find(Button).first(),
    saveButton: component.find(Button).last(),
    editor: component.find(Editor).first(),
    gui: component.find(DataGUI).first(),
    errors: component.find(Errors),
    props
  };
};

describe('Containers::DataFileNew', () => {
  it('should render correctly', () => {
    const { component, toggleButton, saveButton, editor } = setup();
    expect(toggleButton.node.props['type']).toEqual('view-toggle');
    expect(saveButton.node.props['type']).toEqual('create');
    expect(editor.node.props['content']).toEqual('');
    expect(component.state()).toEqual({'baseName': '', 'extn': '.yml', 'guiView': false});
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

  it('should not call clearErrors on unmount if there are no errors.', () => {
    const { component, errors, actions } = setup();
    component.unmount();
    expect(actions.clearErrors).not.toHaveBeenCalled();
  });

  it('should clear errors on unmount.', () => {
    const { component, errors, actions } = setup(Object.assign({}, defaultProps, {
      errors: ['The content is required!']
    }));
    component.unmount();
    expect(actions.clearErrors).toHaveBeenCalled();
  });

  it('should toggle views.', () => {
    const { component, toggleButton } = setup();
    expect(component.state('guiView')).toBe(false);
    toggleButton.simulate('click');
    expect(component.state('guiView')).toBe(true);
  });

  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).not.toHaveBeenCalled();
  });

  it('should activate save button when Editor or input field is changed.', () => {
    const { saveButton } = setup(Object.assign({}, defaultProps, {
      datafileChanged: true
    }));
    expect(saveButton.prop('active')).toBe(true);
  });
});
