import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';

import { Divider, Icon } from 'antd';

import { ADMIN_PREFIX } from 'config';
import { getPage, deletePage } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';
import { ContentBody, StyledAlert } from 'styles';
import PageForm from './PageForm';

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

  render() {
    const { page } = this.state;
    const {
      match: { params: { splat, filename, ext } },
      handleSubmit,
      submitting,
    } = this.props;

    const fullFilename = `${filename}.${ext}`;
    const pageSplat = splat ? `${splat}/${fullFilename}` : `${fullFilename}`;

    const handlers = {
      save: event => event,
    };

    return (
      <div>
        <Helmet>
          <title>{fullFilename}</title>
        </Helmet>
        <HotKeys handlers={handlers}>
          <Breadcrumbs root="pages" splat={pageSplat} />
          <ContentBody>
            <PageForm
              splat={splat}
              page={page}
              onFormSubmit={this.handleSave}
            />
          </ContentBody>
        </HotKeys>
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(PageSingle);
