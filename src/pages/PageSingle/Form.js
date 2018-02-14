import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { ContentBody, StyledAlert, Label } from 'styles';
import { Row, Col, Input, Button, Divider, Icon, Menu, Dropdown } from 'antd';
import MetaField from 'components/MetaField';
import InputField from 'components/InputField';
import MarkdownEditorField from 'components/MarkdownEditorField';

class Form extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      onFormSubmit,
      onPageDelete,
      splat,
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Row gutter={32}>
          <Col span={18}>
            <Field
              name="title"
              size="large"
              component={InputField}
              label="Title"
            />
            <Field
              name="path"
              component={InputField}
              label="Filename"
              addonBefore={splat ? `${splat}/` : null}
            />
            <Field
              name="raw_content"
              component={MarkdownEditorField}
              label="Body"
            />

            <div>
              <Label>Metafields</Label>
              <MetaField name="front_matter.foo" />
            </div>
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
          front_matter: page.front_matter,
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
)(Form);

const BlockButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px !important;
`;
