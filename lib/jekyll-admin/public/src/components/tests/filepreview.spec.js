import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import FilePreview from '../FilePreview';

import { staticfile } from './fixtures';

function setup(file=staticfile) {
  const actions = {
    onClickDelete: expect.createSpy()
  };

  let component = mount(
    <FilePreview file={file} {...actions} />
  );

  return {
    component,
    filename: component.find('.filename'),
    image: component.find('img'),
    div: component.find('.file-preview > div'),
    actions: actions
  };
}

describe('Components::FilePreview', () => {
  it('should render an image if the file has an image extension', () => {
    const { component, image, div } = setup();
    expect(image.node).toExist();
    expect(div.node).toNotExist();
  });
  it('should render a div if the file does not have an image extension', () => {
    const { component, image, div } = setup({...staticfile, extname: 'html'});
    expect(image.node).toNotExist();
    expect(div.node).toExist();
  });
});
