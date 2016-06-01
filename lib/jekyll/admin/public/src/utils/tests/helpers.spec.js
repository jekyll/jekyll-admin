import expect from 'expect';

import { toYAML, toJSON } from '../helpers';

describe('Helper functions', () => {
  it('should convert object to YAML string correctly', () => {
    let obj = { title: "Not an awesome title" };
    let expectedString = "title: Not an awesome title\n";
    expect(toYAML(obj)).toBe(expectedString);

    obj = {};
    expectedString = "";
    expect(toYAML(obj)).toBe(expectedString);
  });

  it('should convert YAML string to object correctly', () => {
    let yaml = "title: Not an awesome title";
    let expectedObj = { title: "Not an awesome title" };
    expect(toJSON(yaml)).toEqual(expectedObj);

    yaml = "";
    expectedObj = {};
    expect(toJSON(yaml)).toEqual(expectedObj);
  });
});
