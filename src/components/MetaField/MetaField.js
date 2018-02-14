import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Row, Col, Icon, Dropdown, Menu, Input } from 'antd';
import InputField from 'components/InputField';

export default class MetaField extends Component {
  state = {
    type: 'simple',
  };

  changeType = item => {
    if (item.key === 'delete') {
      const { onDelete } = this.props;
      onDelete && onDelete();
    } else {
      this.setState({ type: item.key });
    }
  };

  renderMenu = () => {
    const { onDelete } = this.props;
    const { type } = this.state;
    const types = [
      { type: 'simple', icon: 'form', languageId: 'label.makeSimple' },
      { type: 'array', icon: 'bars', languageId: 'label.makeArray' },
      { type: 'object', icon: 'appstore-o', languageId: 'label.makeObject' },
    ];
    const visibleTypes = types.filter(t => t.type !== type);

    return (
      <Menu onClick={this.changeType}>
        {visibleTypes.map(t => (
          <Menu.Item key={t.type}>
            <Icon type={t.icon} /> <FormattedMessage id={t.languageId} />
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item key="delete">
          <Icon type="delete" /> <FormattedMessage id="label.delete" />
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { type } = this.state;
    const { name } = this.props;
    return (
      <Input.Group style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            value={name}
            addonAfter={
              <Dropdown
                overlay={this.renderMenu()}
                placement="bottomCenter"
                trigger={['click']}
              >
                <a className="ant-dropdown-link" href="#">
                  <Icon type="menu-unfold" />
                </a>
              </Dropdown>
            }
          />
        </Col>
        <Col span={18}>
          {type === 'simple' && <Field name={name} component={InputField} />}
        </Col>
      </Input.Group>
    );
  }
}
