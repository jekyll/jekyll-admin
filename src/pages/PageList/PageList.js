import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Input, Button, Icon, Popconfirm } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ADMIN_PREFIX } from 'config';
import { getPages, deletePage } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';

import { ContentBody, RightSpan, StyledAlert } from 'styles';

class PageList extends Component {
  state = {
    pages: [],
    message: null,
    messageType: null,
  };

  async componentDidMount() {
    const { match: { params: { splat } } } = this.props;
    const { ok, data } = await getPages(splat);
    if (ok) {
      this.setState({ pages: data });
    } else {
      this.setState({
        messageType: 'error',
        message: 'Could not fetch pages.',
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { match: { params: { splat } } } = nextProps;
    if (this.props.match.params.splat !== splat) {
      const { ok, data } = await getPages(splat);
      if (ok) {
        this.setState({ pages: data });
      } else {
        this.setState({
          messageType: 'error',
          message: 'Could not fetch pages.',
        });
      }
    }
  }

  handleDeleteClick = async name => {
    const { match: { params: { splat } } } = this.props;
    const { pages } = this.state;
    const { ok } = await deletePage(splat, name);
    if (ok) {
      this.setState({
        messageType: 'success',
        message: 'Deleted',
        pages: pages.filter(page => page.name !== name),
      });
    } else {
      this.setState({ messageType: 'error', message: 'Error' });
    }
  };

  generateTableData = () => {
    const { pages } = this.state;
    return pages.map((page, index) => ({
      key: index,
      name: page.name,
      type: page.type,
      path: page.path,
      http_url: page.http_url,
    }));
  };

  generateTableColumns = () => {
    const { intl: { messages, formatMessage } } = this.props;
    return [
      {
        title: messages['label.name'],
        dataIndex: 'name',
        render: (text, { name, path, type }) => (
          <Link to={`${ADMIN_PREFIX}/pages/${path}`}>
            <Icon type={type === 'directory' ? 'folder' : 'file-text'} /> {name}
          </Link>
        ),
      },
      {
        title: <RightSpan>{messages['label.action']}</RightSpan>,
        dataIndex: 'action',
        render: (text, { http_url, name, type }) => (
          <RightSpan>
            {http_url && (
              <Link to={http_url} target="_blank">
                <Button type="primary" icon="eye" ghost>
                  {messages['label.view']}
                </Button>
              </Link>
            )}{' '}
            {type !== 'directory' && (
              <Popconfirm
                placement="topRight"
                title={formatMessage({ id: 'label.delete?' }, { type: 'page' })}
                onConfirm={e => this.handleDeleteClick(name)}
                okText={messages['label.yes']}
                cancelText={messages['label.no']}
              >
                <Button type="danger" icon="delete" ghost>
                  {messages['label.delete']}
                </Button>
              </Popconfirm>
            )}
          </RightSpan>
        ),
      },
    ];
  };

  render() {
    const { message, messageType } = this.state;
    const { match: { params: { splat } }, intl: { messages } } = this.props;
    return (
      <div>
        {message && (
          <StyledAlert
            message={
              messageType === 'success'
                ? messages['label.success']
                : messages['label.error']
            }
            description={message}
            type={messageType}
            showIcon
            banner
            closable
          />
        )}
        <Breadcrumbs root="pages" splat={splat} />
        <ContentBody>
          <Table
            columns={this.generateTableColumns()}
            dataSource={this.generateTableData()}
            pagination={{ pageSize: 5 }}
          />
        </ContentBody>
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(PageList);
