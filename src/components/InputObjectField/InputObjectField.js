import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, Fields, FieldArray } from 'redux-form';
import { Row, Col, Icon, Dropdown, Menu, Input } from 'antd';
import InputField from 'components/InputField';
import InputFields from 'components/InputFields';
import InputArrayField from 'components/InputArrayField';

export default class InputObjectField extends Component {
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
    const { name, fields } = this.props;
    console.log('name', name);
    return (
      <Input.Group style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Field
            name={name}
            component={InputField}
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
          {type === 'array' && (
            <FieldArray name="test" component={InputArrayField} />
          )}
          {type === 'object' && (
            <Fields names={name} component={InputObjectField} />
          )}
        </Col>
      </Input.Group>
    );
  }
}
