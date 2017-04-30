import React from 'react';
import { shallow } from 'enzyme';
import Errors from '../../../components/Errors';
import Editor from '../../../components/Editor';
import Button from '../../../components/Button';
import { Configuration } from '../Configuration';
import { toYAML } from '../../../utils/helpers';
import { config } from './fixtures';

const defaultProps = {
  config,
  editorChanged: false,
  errors: [],
  router: {},
  route: {},
  updated: false,
  clearErrors: jest.fn(),
  onEditorChange: jest.fn(),
  putConfig: jest.fn()
};

const setup = (props = defaultProps) => {
  const component = shallow(<Configuration {...props} />);
  return {
    component,
    editor: component.find(Editor),
    errors: component.find(Errors),
    saveButton: component.find(Button)
  };
};

describe('Containers::Configuration', () => {
  it('should render correctly with initial props', () => {
    const { component, editor, saveButton } = setup();
    const { raw_content } = config;
    expect(editor.prop('content')).toEqual(raw_content);
    expect(saveButton.prop('active')).toBe(false);
    expect(saveButton.prop('triggered')).toBe(false);
  });

  it('should render correctly with updated props', () => {
    const { component, editor, saveButton } = setup(
      Object.assign({}, defaultProps, {
        editorChanged: true,
        updated: true
      })
    );
    expect(saveButton.prop('triggered')).toBe(true);
    expect(saveButton.prop('active')).toBe(true);
  });

  it('should not render error messages with initial props', () => {
    const { errors } = setup();
    expect(errors.node).toBeFalsy();
  });

  it('should render error messages when necessary', () => {
    const { errors } = setup(Object.assign({}, defaultProps, {
      errors: ['The content is required.']
    }));
    expect(errors.node).toBeTruthy();
  });
});
