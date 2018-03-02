import React, { Component } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import InputField from 'components/InputField';
import { Button, Icon } from 'antd';

const InputArrayField = ({ fields, meta: { error } }) => {
  return (
    <Container>
      <div>
        {fields.map((name, index) => (
          <Field
            name={name}
            component={InputField}
            addonAfter={
              <a
                onClick={() => fields.remove(index)}
                className="ant-dropdown-link"
              >
                <Icon type="minus" />
              </a>
            }
          />
        ))}
      </div>
      <Button
        type="primary"
        shape="circle"
        icon="plus"
        size="small"
        onClick={() => fields.push({})}
      />
    </Container>
  );
};

export default InputArrayField;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;
