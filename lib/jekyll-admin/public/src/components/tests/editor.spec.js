import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Editor from '../Editor';
import { toYAML } from '../../utils/helpers';

import { config } from './fixtures';

function setup(props = {config, editorChanged: false}) {
  const actions = {
    onEditorChange: expect.createSpy()
  };

  let component = shallow(
    <Editor {...props} {...actions} />
  );

  return {
    component,
    editor: component.first(),
    actions: actions
  };
}

describe('Components::Editor', () => {
  it('should render correctly', () => {
    const { component, editor } = setup();
    expect(editor.prop('value')).toEqual(toYAML(config));
  });
  it('should call onEditorChange if editor is not changed', () => {
    const { actions, editor, component } = setup();
    editor.simulate('change');
    expect(actions.onEditorChange).toHaveBeenCalled();
  });
  it('should not call onEditorChange again if editor is already changed', () => {
    const { actions, editor } = setup({ config, editorChanged: true });
    editor.simulate('change');
    expect(actions.onEditorChange).toNotHaveBeenCalled();
  });
});
