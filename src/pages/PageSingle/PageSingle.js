import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';

import { Button } from 'antd';

import { ADMIN_PREFIX } from 'config';
import { getPage, deletePage } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';
import { ContentBody, StyledAlert, Header } from 'styles';
import Form from './Form';

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
    console.log(values);
  };

  handleDelete = async () => {
    const { match: { params: { splat, filename, ext } }, history } = this.props;
    const { ok, data } = await deletePage(splat, `${filename}.${ext}`);
    if (ok) {
      history.push(`${ADMIN_PREFIX}/pages/${splat}`);
    } else {
      this.setState({
        messageType: 'error',
        message: 'Could not delete the page.',
      });
    }
  };

  render() {
    const { page } = this.state;
    const {
      match: { params: { splat, filename, ext } },
      handleSubmit,
      submitting,
      history,
    } = this.props;
    const isCreate = !filename && !ext;
    const fullFilename = `${filename}.${ext}`;
    const title = isCreate ? 'New page' : fullFilename;
    const pageSplat = isCreate
      ? splat
      : splat ? `${splat}/${fullFilename}` : `${fullFilename}`;
    const createRoute = splat
      ? `${ADMIN_PREFIX}/pages/${splat}/new`
      : `${ADMIN_PREFIX}/pages/new`;

    const handlers = {
      save: event => event,
    };

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <HotKeys handlers={handlers}>
          <Header>
            <Breadcrumbs root="pages" splat={pageSplat} />
            <Button
              onClick={() => history.push(createRoute)}
              type="primary"
              size="small"
              icon="plus-circle-o"
            >
              <FormattedMessage id="button.create" />
            </Button>
          </Header>

          <ContentBody>
            <Form
              splat={splat}
              page={page}
              onFormSubmit={this.handleSave}
              onPageDelete={this.handleDelete}
            />
          </ContentBody>
        </HotKeys>
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(PageSingle);
