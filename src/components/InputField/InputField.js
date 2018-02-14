import React, { Component } from 'react';
import { Input } from 'antd';
import { Label } from 'styles';

const InputField = ({ input, label, meta: { touched, error }, ...rest }) => {
  return (
    <div style={{ marginBottom: 32 }}>
      {label && <Label>{label}</Label>}
      <Input placeholder={label} {...rest} {...input} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

export default InputField;
