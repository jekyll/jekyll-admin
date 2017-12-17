import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';

import { Row, Col, Input, Button, Divider } from 'antd';

import { ADMIN_PREFIX } from 'config';
import { getPage, deletePage } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';
import MarkdownEditor from 'components/MarkdownEditor';
import { ContentBody, StyledAlert } from 'styles';

class PageSingle extends Component {
  state = {
    page: {},
    messageType: null,
  };

  async componentDidMount() {
    const { match: { params: { splat, filename, ext } } } = this.props;
    const { ok, data } = await getPage(splat, `${filename}.${ext}`);
    if (ok) {
      this.setState({ page: data });
    } else {
      this.setState({
        messageType: 'error',
        message: 'Could not fetch the page.',
      });
    }
  }

  handleSave = values => {
    setTimeout(() => {
      console.log(values);
    }, 1900);
  };

  renderField = ({ input, label, meta: { touched, error }, ...rest }) => (
    <div style={{ marginBottom: 32 }}>
      <strong>{label}</strong>
      <Input {...input} placeholder={label} {...rest} />
      {touched && error && <span>{error}</span>}
    </div>
  );

  renderMarkdownEditor = ({
    input,
    label,
    meta: { touched, error },
    ...rest
  }) => (
    <div>
      <strong>{label}</strong>
      <MarkdownEditor placeholder="Body" {...input} />
      {touched && error && <span>{error}</span>}
    </div>
  );

  render() {
    const {
      match: { params: { splat, filename, ext } },
      handleSubmit,
      submitting,
    } = this.props;
    const pageSplat = splat
      ? `${splat}/${filename}.${ext}`
      : `${filename}.${ext}`;

    const { page } = this.state;

    const handlers = {
      save: event => event,
    };

    return (
      <div>
        <Helmet>
          <title>My Title</title>
        </Helmet>
        <HotKeys handlers={handlers}>
          <Breadcrumbs root="pages" splat={pageSplat} />
          <ContentBody>
            <form onSubmit={handleSubmit(this.handleSave)}>
              <Row gutter={32}>
                <Col span={20}>
                  <Field
                    name="title"
                    size="large"
                    component={this.renderField}
                    label="Title"
                  />
                  <Field
                    name="title"
                    component={this.renderField}
                    label="Filename"
                    addonBefore={splat ? `${splat}/` : null}
                  />
                  <Field
                    name="raw_content"
                    component={this.renderMarkdownEditor}
                    label="Body"
                  />
                </Col>
                <Col span={4}>
                  <BlockButton
                    type="primary"
                    htmlType="submit"
                    icon="save"
                    size="large"
                    loading={submitting}
                  >
                    SAVE
                  </BlockButton>
                  <BlockButton type="primary" icon="eye" size="large">
                    VIEW
                  </BlockButton>
                  <BlockButton type="danger" icon="delete" size="large">
                    DELETE
                  </BlockButton>
                </Col>
              </Row>
            </form>
          </ContentBody>
        </HotKeys>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

const mapStateToProps = state => {
  const form = 'page';
  return {
    form,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    validate,
  }),
  withRouter,
  injectIntl
)(PageSingle);

const BlockButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;
