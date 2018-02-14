import React, { Component } from 'react';
import MarkdownEditor from 'components/MarkdownEditor';
import { Label } from 'styles';

const MarkdownEditorField = ({
  input,
  label,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <MarkdownEditor placeholder="Body" {...rest} {...input} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default MarkdownEditorField;
