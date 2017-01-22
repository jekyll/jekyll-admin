import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Editor from '../../../components/Editor';
import Button from '../../../components/Button';
import { Configuration } from '../Configuration';
import { toYAML } from '../../../utils/helpers';
import { config } from './fixtures';

const defaultProps = {
  config,
  editorChanged: false,
  updated: false,
  router: {},
  route: {},
  onEditorChange: expect.createSpy(),
  putConfig: expect.createSpy()
};

const setup = (props = defaultProps) => {
  const component = shallow(<Configuration {...props} />);
  return {
    component,
    editor: component.find(Editor),
    saveButton: component.find(Button)
  };
};

describe('Containers::Configuration', () => {
  it('should render correctly with initial props', () => {
    const { component, editor, saveButton } = setup();
    expect(editor.prop('content')).toEqual(toYAML(config));
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
});
