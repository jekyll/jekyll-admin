import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { StaticFiles } from '../StaticFiles';

import { staticfile } from './fixtures';

function setup(files=[staticfile]) {
  const actions = {
    fetchStaticFiles: expect.createSpy(),
    uploadStaticFiles: expect.createSpy(),
    deleteStaticFile: expect.createSpy(),
    search: expect.createSpy()
  };

  const component = mount(
    <StaticFiles
      files={files}
      message=""
      isFetching={false}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    message: component.find('.message'),
    info: component.find('.preview-info'),
    previewContainer: component.find('.preview-container')
  };
}

describe('Containers::StaticFiles', () => {
  it('should render correctly', () => {
    const { h1, info, previewContainer, message } = setup();
    expect(h1.text()).toBe('Static Files');
    expect(info.node).toNotExist();
    expect(previewContainer.node).toExist();
  });

  it('should render correctly when there are not any files', () => {
    const { component, info, previewContainer, h1 } = setup([]);
    const compProps = component.props();
    expect(info.node).toExist();
    expect(previewContainer.node).toNotExist();
  });

  it('should call fetchStaticFiles action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchStaticFiles).toHaveBeenCalled();
  });
});
