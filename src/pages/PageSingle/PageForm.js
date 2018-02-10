import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { ContentBody, StyledAlert, Label } from 'styles';
import MarkdownEditor from 'components/MarkdownEditor';
import { Row, Col, Input, Button, Divider, Icon, Menu, Dropdown } from 'antd';
const InputGroup = Input.Group;

class PageForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  renderField = ({ input, label, meta: { touched, error }, ...rest }) => {
    return (
      <div style={{ marginBottom: 32 }}>
        <Label>{label}</Label>
        <Input placeholder={label} {...rest} {...input} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  };

  renderMarkdownEditor = ({
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

  render() {
    const {
      onFormSubmit,
      onPageDelete,
      splat,
      handleSubmit,
      submitting,
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Icon type="bars" /> Make array
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="appstore-o" /> Make object
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Icon type="delete" /> Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Row gutter={32}>
          <Col span={18}>
            <Field
              name="title"
              size="large"
              component={this.renderField}
              label="Title"
            />
            <Field
              name="path"
              component={this.renderField}
              label="Filename"
              addonBefore={splat ? `${splat}/` : null}
            />
            <Field
              name="raw_content"
              component={this.renderMarkdownEditor}
              label="Body"
            />

            <Metafields>
              <Label>Metafields</Label>
              <InputGroup style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Input
                    defaultValue="key"
                    addonAfter={
                      <Dropdown
                        overlay={menu}
                        placement="bottomCenter"
                        trigger={['click']}
                      >
                        <a className="ant-dropdown-link" href="#">
                          <Icon
                            type="menu-unfold"
                            onClick={() => console.log('yow')}
                          />
                        </a>
                      </Dropdown>
                    }
                  />
                </Col>
                <Col span={18}>
                  <Input defaultValue="value" />
                </Col>
              </InputGroup>

              <InputGroup style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Input defaultValue="key" />
                </Col>
                <Col span={18}>
                  <InputGroup style={{ marginBottom: 16 }}>
                    <Col span={6}>
                      <Input defaultValue="key" />
                    </Col>
                    <Col span={18}>
                      <Input defaultValue="value" />
                    </Col>
                  </InputGroup>
                </Col>
              </InputGroup>
            </Metafields>
          </Col>
          <Col span={6}>
            <BlockButton
              type="primary"
              htmlType="submit"
              icon="save"
              size="large"
              loading={submitting}
            >
              <FormattedMessage id="button.save" />
            </BlockButton>
            <BlockButton type="primary" icon="eye" size="large">
              <FormattedMessage id="button.view" />
            </BlockButton>
            <BlockButton
              onClick={onPageDelete}
              type="danger"
              icon="delete"
              size="large"
            >
              <FormattedMessage id="button.delete" />
            </BlockButton>
          </Col>
        </Row>
      </form>
    );
  }
}

const validate = values => {
  console.log(values);
  const errors = {};

  return errors;
};

const mapStateToProps = (
  state,
  { page, match: { params: { filename, ext } } }
) => {
  const form = 'page';
  const isCreate = !filename && !ext;
  return {
    form,
    initialValues: isCreate
      ? null
      : {
          title: page.title || page.name,
          path: page.name,
          raw_content: page.raw_content,
        },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  reduxForm({
    validate,
    enableReinitialize: true,
  })
)(PageForm);

const BlockButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px !important;
`;

const Metafields = styled.div``;
