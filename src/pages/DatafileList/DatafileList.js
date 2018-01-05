import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Input, Button, Icon, Popconfirm } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ADMIN_PREFIX } from 'config';
import { getDatafiles, deleteDatafile } from 'config/api';
import Breadcrumbs from 'components/Breadcrumbs';

import { ContentBody, RightSpan, StyledAlert } from 'styles';

class DatafileList extends Component {
  state = {
    datafiles: [],
    message: null,
    messageType: null,
  };

  async componentDidMount() {
    const { match: { params: { splat } } } = this.props;
    const { ok, data } = await getDatafiles(splat);
    if (ok) {
      this.setState({ datafiles: data });
    } else {
      this.setState({
        messageType: 'error',
        message: 'Could not fetch datafiles.',
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { match: { params: { splat } } } = nextProps;
    if (this.props.match.params.splat !== splat) {
      const { ok, data } = await getDatafiles(splat);
      if (ok) {
        this.setState({ datafiles: data });
      } else {
        this.setState({
          messageType: 'error',
          message: 'Could not fetch datafiles.',
        });
      }
    }
  }

  handleDeleteClick = async name => {
    const { match: { params: { splat } } } = this.props;
    const { datafiles } = this.state;
    const { ok } = await deleteDatafile(splat, name);
    if (ok) {
      this.setState({
        messageType: 'success',
        message: 'Deleted',
        datafiles: datafiles.filter(datafile => datafile.name !== name),
      });
    } else {
      this.setState({ messageType: 'error', message: 'Error' });
    }
  };

  generateTableData = () => {
    const { datafiles } = this.state;
    return datafiles.map((datafile, index) => ({
      key: index,
      name:
        datafile.type === 'directory'
          ? datafile.name
          : datafile.slug + datafile.ext,
      type: datafile.type,
      path: datafile.path,
      http_url: datafile.http_url,
    }));
  };

  generateTableColumns = () => {
    const { intl: { messages, formatMessage } } = this.props;
    return [
      {
        title: messages['label.name'],
        dataIndex: 'name',
        render: (text, { name, path, type }) => (
          <Link to={`${ADMIN_PREFIX}/datafiles/${path}`}>
            <Icon type={type === 'directory' ? 'folder' : 'file-text'} /> {name}
          </Link>
        ),
      },
      {
        title: <RightSpan>{messages['label.action']}</RightSpan>,
        dataIndex: 'action',
        render: (text, { http_url, name, type }) => (
          <RightSpan>
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
        <Breadcrumbs root="datafiles" splat={splat} />
        <ContentBody>
          <Table
            columns={this.generateTableColumns()}
            dataSource={this.generateTableData()}
            pagination={{ datafilesize: 5 }}
          />
        </ContentBody>
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(DatafileList);
