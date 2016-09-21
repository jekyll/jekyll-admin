import expect from 'expect';

import {
  toYAML, toJSON, capitalize, toTitleCase, slugify,
  existingUploadedFilenames
} from '../helpers';

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

  it('should capitalize the string correctly', () => {
    let str = "awesome";
    let expected = "Awesome";
    let actual = capitalize(str);
    expect(actual).toEqual(expected);
    str = "Awesome";
    actual = capitalize(str);
    expect(actual).toEqual(expected);
    str = undefined;
    actual = capitalize(str);
    expect(actual).toEqual('');
  });

  it('should titlecase the string correctly', () => {
    let str = "awesome jekyll";
    let expected = "Awesome Jekyll";
    let actual = toTitleCase(str);
    expect(actual).toEqual(expected);
    str = "awesome Jekyll";
    actual = toTitleCase(str);
    expect(actual).toEqual(expected);
    str = undefined;
    actual = toTitleCase(str);
    expect(actual).toEqual('');
  });

  it('should slugify the string correctly', () => {
    let str = "Awesome Jekyll";
    let expected = "awesome-jekyll";
    let actual = slugify(str);
    expect(actual).toEqual(expected);
    str = "-This is a test title 1!-";
    expected = "this-is-a-test-title-1";
    actual = slugify(str);
    expect(actual).toEqual(expected);
    str = "Démonstration par l'exemple‘";
    expected = "demonstration-par-lexemple";
    actual = slugify(str);
    expect(actual).toEqual(expected);
    str = undefined;
    actual = slugify(str);
    expect(actual).toEqual('');
  });

  it('should return the existing files', () => {
    let currentFiles = [];
    let uploadedFiles = [];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);
    currentFiles = undefined;
    uploadedFiles = undefined;
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);
    currentFiles = { foo: 'test' };
    uploadedFiles = [{ name: 'test2.html' }];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);
    currentFiles = [
      { path: 'test.html' },
      { path: 'logo.png' }
    ];
    uploadedFiles = [
      { name: 'test2.html' }
    ];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual([]);
    currentFiles = [
      { path: 'test.html' },
      { path: 'logo.png' }
    ];
    uploadedFiles = [
      { name: 'test.html' }
    ];
    expect(existingUploadedFilenames(uploadedFiles, currentFiles)).toEqual(['test.html']);
    currentFiles = [
      { path: 'test.html' },
      { path: 'logo.png' }
    ];
    uploadedFiles = [
      { name: 'test.html' },
      { name: 'logo.png' },
      { name: 'logo2.html' }
    ];
    expect(
      existingUploadedFilenames(uploadedFiles, currentFiles)
    ).toEqual(['test.html','logo.png']);
  });
});
