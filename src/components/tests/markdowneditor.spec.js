import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MarkdownEditor from '../MarkdownEditor';

const props = {
  onChange: f => f,
  onSave: f => f,
  placeholder: 'Test',
  initialValue: '',
};

describe('Components::MarkdownEditor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarkdownEditor {...props} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<MarkdownEditor {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
