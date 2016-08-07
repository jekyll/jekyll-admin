import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';

import { DataFileEdit } from '../DataFileEdit';

const defaultProps = {
  datafile: {},
  message: "",
  updated: false,
  datafileChanged: false,
  params: { data_file: "data_file" }
};

function setup(props = defaultProps) {
  const actions = {
    fetchDataFile: expect.createSpy(),
    putDataFile: expect.createSpy(),
    deleteDataFile: expect.createSpy(),
    onEditorChange: expect.createSpy()
  };

  let component = shallow(
    <DataFileEdit {...actions} {...props} />
  );

  return {
    component,
    actions,
    saveButton: component.find('.content-side a').first(),
    deleteButton: component.find('.content-side').last(),
    props
  };
}

describe('Containers::DataFileEdit', () => {
  it('should render correctly', () => {
    let { component } = setup(Object.assign(
      {}, defaultProps, { isFetching: true }
    ));
    component = setup(Object.assign(
      {}, defaultProps, { datafile: {} }
    )).component;
    expect(component.find('h1').node).toExist();
  });

  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).toNotHaveBeenCalled();
  });

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile).toNotHaveBeenCalled(); // TODO pass prompt
  });
});
