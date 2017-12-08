import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table, Input, Button, Icon, Alert, Popconfirm } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ADMIN_PREFIX } from 'config';
import { getPages, deletePage } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';

class Pages extends Component {
  state = {
    pages: [],
    message: null,
    messageType: null,
  };

  async componentDidMount() {
    const { match: { params: { splat } } } = this.props;
    const result = await getPages(splat);
    if (result.ok) {
      this.setState({ pages: result.data });
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
      const result = await getPages(splat);
      if (result.ok) {
        this.setState({ pages: result.data });
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
    const result = await deletePage(splat, name);
    if (result.ok) {
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
        title: <ActionTitle>{messages['label.action']}</ActionTitle>,
        dataIndex: 'action',
        render: (text, { http_url, name, type }) => (
          <ActionColumn>
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
          </ActionColumn>
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

export default compose(withRouter, injectIntl)(Pages);

const ContentBody = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 360px;
`;

const StyledAlert = styled(Alert)`
  margin-top: 16px;
`;

const CustomFilterDropdown = styled.div`
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  > input {
    width: 130px;
    margin-right: 8px;
  }
`;

const Highlight = styled.span`
  color: #f50;
`;

const ActionColumn = styled.span`
  float: right;
`;

const ActionTitle = styled.span`
  float: right;
`;
