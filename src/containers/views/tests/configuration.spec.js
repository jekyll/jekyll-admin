import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Editor from '../../../components/Editor';
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
    props,
    editor: component.find(Editor),
    saveButton: component.find('a')
  };
};

describe('Containers::Configuration', () => {
  it('should render correctly with initial props', () => {
    const { component, editor, saveButton } = setup();
    expect(saveButton.text()).toBe('Save');
    expect(saveButton.prop('className').trim()).toBe('btn btn-inactive');
    expect(editor.prop('content')).toEqual(toYAML(config));
  });

  it('should render correctly with updated props', () => {
    const { component, editor, saveButton } = setup(
      Object.assign({}, defaultProps, {
        editorChanged: true,
        updated: true
      })
    );
    expect(saveButton.text()).toBe('Saved');
    expect(saveButton.prop('className').trim()).toBe('btn btn-active');
  });
});
