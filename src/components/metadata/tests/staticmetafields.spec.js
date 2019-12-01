import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import StaticMetaData from '../StaticMetaFields';

const propsList = [
  {
    label: 'simple field-value',
    data: { layout: 'page' },
  },
  {
    label: 'array field-value',
    data: { plugins: ['jekyll-admin', 'jekyll-feed'] },
  },
  {
    label: 'array field-value with nested key-value pairs',
    data: {
      navs: [
        {
          label: 'About Us',
          url: '/about/',
        },
        {
          label: 'Contact',
          url: '/contact-us/',
        },
      ],
    },
  },
  {
    label: 'array field-value with nested arrays',
    data: {
      rows: [['foo', 'bar'], ['lorem', 'ipsum']],
    },
  },
  {
    label: 'object field-value',
    data: { author: { name: 'John Doe', handle: 'JohnDoe' } },
  },
  {
    label: 'object field-value with nested key-value pairs',
    data: {
      roles: {
        admin: {
          current: 'John Doe',
          handle: 'JohnDoe',
        },
        collaborator: {
          current: 'Jane Doe',
          handle: 'JaneDoe',
        },
      },
    },
  },
  {
    label: 'object field-value with nested arrays',
    data: {
      tableData: {
        header: ['Filename', 'Type', 'Actions'],
        rows: ['about.md', 'Markdown File', ['view', 'delete']],
      },
    },
  },
];

describe('Components::StaticMetaData', () => {
  propsList.forEach(entry => {
    it(`should render ${entry.label} correctly`, () => {
      const tree = renderer
        .create(<StaticMetaData fields={entry.data} />, {
          createNodeMock: () => document.createElement('textarea'),
        })
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
