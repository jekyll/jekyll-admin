import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { DataFileNew } from '../DataFileNew';

const defaultProps = {
  datafile: {},
  message: "",
  updated: false,
  datafileChanged: false,
  editorChanged: false,
  errors: []
};

function setup(props = defaultProps) {
  const actions = {
    putDataFile: expect.createSpy(),
    onDataFileChanged: expect.createSpy(),
    clearErrors: expect.createSpy()
  };

  let component = shallow(
    <DataFileNew {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a').first(),
    props
  };
}

describe('Containers::DataFileNew', () => {
  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).toNotHaveBeenCalled();
  });
  it('should call activate save button if a field is changed.', () => {
    const { saveButton, actions } = setup(Object.assign({}, defaultProps, {
      datafileChanged: true
    }));
    expect(saveButton.prop('className')).toMatch('btn-success');
  });
});
