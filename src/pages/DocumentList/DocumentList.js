import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Input, Button, Icon, Alert, Popconfirm } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ADMIN_PREFIX } from 'config';
import { getDocuments, deleteDocument } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';

class DocumentList extends Component {
  state = {
    posts: [],
    message: null,
    messageType: null,
  };

  async componentDidMount() {
    const { match: { params: { collection, splat } } } = this.props;
    const { ok, data } = await getDocuments(collection, splat);
    if (ok) {
      this.setState({ posts: data });
    } else {
      this.setState({
        messageType: 'error',
        message: 'Could not fetch documents.',
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { match: { params: { collection, splat } } } = nextProps;

    if (
      this.props.match.params.splat !== splat ||
      this.props.match.params.collection !== collection
    ) {
      const { ok, data } = await getDocuments(collection, splat);
      if (ok) {
        this.setState({ posts: data });
      } else {
        this.setState({
          messageType: 'error',
          message: 'Could not fetch documents.',
        });
      }
    }
  }

  handleDeleteClick = async name => {
    const { match: { params: { collection, splat } } } = this.props;
    const { posts } = this.state;
    const { ok } = await deleteDocument(collection, splat, name);
    if (ok) {
      this.setState({
        messageType: 'success',
        message: 'Deleted',
        posts: posts.filter(post => post.name !== name),
      });
    } else {
      this.setState({ messageType: 'error', message: 'Error' });
    }
  };

  generateTableData = () => {
    const { posts } = this.state;
    return posts.map((post, index) => ({
      key: index,
      name: post.name,
      type: post.type,
      path: post.path.substr(1),
      http_url: post.http_url,
    }));
  };

  generateTableColumns = () => {
    const {
      intl: { messages, formatMessage },
      match: { params: { collection } },
    } = this.props;
    return [
      {
        title: messages['label.name'],
        dataIndex: 'name',
        render: (text, { name, path, type }) => (
          <Link to={`${ADMIN_PREFIX}/${path}`}>
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
    const {
      match: { params: { collection, splat } },
      intl: { messages },
    } = this.props;
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
        <Breadcrumbs root={collection} splat={splat} />
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

export default compose(withRouter, injectIntl)(DocumentList);

const ContentBody = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 360px;
`;

const StyledAlert = styled(Alert)`
  margin-top: 16px;
`;

const RightSpan = styled.span`
  float: right;
`;
