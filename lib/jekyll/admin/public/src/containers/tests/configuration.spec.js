import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
// NOTE Cannot run brace on server side
//import Configuration from '../views/Configuration';

function setup() {
  let props = {
    config: { title: 'Awesome Title' },
    updated: false,
    message: "Configuration updated",
    editorChanged: false,
    onEditorChange: expect.createSpy(),
    putConfig: expect.createSpy()
  };

  //let output = shallow(<Configuration {...props} />);

  return {
    props,
    output: {}
  };
}

describe('<Configuration />', () => {
  it('should render correctly', () => {
    //const { output } = setup()
    //expect(output.props.className).toBe('content-header')
  });
});
