import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Configuration } from '../Configuration';
import Editor from '../../../components/Editor';

import { config } from './fixtures';

const defaultProps = {
  config,
  error: "",
  editorChanged: false,
  updated: false,
  onEditorChange: expect.createSpy(),
  postConfig: expect.createSpy()
};

function setup(props = defaultProps) {
  let component = shallow(<Configuration {...props} />);

  return {
    component,
    props,
    editor: component.find(Editor),
    saveButton: component.find('a'),
    error: component.find('strong')
  };
}

describe('Containers::Configuration', () => {
  it('should render correctly with initial props', () => {
    const { component, editor, saveButton, error } = setup();
    expect(saveButton.text()).toBe('Save');
    expect(saveButton.prop('className').trim()).toBe('btn');
    expect(error.node).toNotExist();
    expect(editor.prop('config')).toEqual(config);
  });
  it('should render correctly with updated props', () => {
    const { component, editor, saveButton, error } = setup(
      Object.assign({}, defaultProps, {
        error: 'Something gone wrong',
        editorChanged: true,
        updated: true
      })
    );
    expect(saveButton.text()).toBe('Saved');
    expect(saveButton.prop('className').trim()).toBe('btn btn-active');
    expect(error.node).toExist();
  });
});
