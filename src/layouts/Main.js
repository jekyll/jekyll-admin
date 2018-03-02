import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { ADMIN_PREFIX } from 'config';
import { getConfiguration } from 'config/api';
import keymap from 'config/keymap';
import { FormattedMessage } from 'react-intl';
import { HotKeys } from 'react-hotkeys';
import logoImg from './logo.png';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Main extends Component {
  state = {
    collapsed: false,
    config: null,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  async componentDidMount() {
    const result = await getConfiguration();
    if (result.ok) {
      this.setState({ config: result.data.content });
    }
  }

  render() {
    const { config } = this.state;
    return (
      <HotKeys keyMap={keymap}>
        <StyledLayout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <LogoWrapper>
              <Logo src={logoImg} />
            </LogoWrapper>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to={`${ADMIN_PREFIX}/pages`}>
                  <Icon type="file-text" />
                  <FormattedMessage id="sidebar.pages" />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${ADMIN_PREFIX}/posts`}>
                  <Icon type="file-ppt" />
                  <FormattedMessage id="sidebar.posts" />
                </Link>
              </Menu.Item>
              <SubMenu
                title={
                  <span>
                    <Icon type="book" />
                    <FormattedMessage id="sidebar.collections" />
                  </span>
                }
              >
                {config &&
                  Object.keys(config.collections).map(collection => (
                    <Menu.Item key={collection}>
                      <Link to={`${ADMIN_PREFIX}/${collection}`}>
                        {collection}
                      </Link>
                    </Menu.Item>
                  ))}
              </SubMenu>
              <Menu.Item>
                <Link to={`${ADMIN_PREFIX}/datafiles`}>
                  <Icon type="hdd" />
                  <FormattedMessage id="sidebar.datafiles" />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${ADMIN_PREFIX}/staticfiles`}>
                  <Icon type="file" />
                  <FormattedMessage id="sidebar.staticfiles" />
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <StyledHeader>
              {(config && config.title) || 'Your awesome title!'}
              <Version>1.0.0</Version>
            </StyledHeader>
            <StyledContent>{this.props.children}</StyledContent>
            <Footer>Jekyll Admin © {new Date().getFullYear()}</Footer>
          </Layout>
        </StyledLayout>
      </HotKeys>
    );
  }
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 0 16px;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 16px;
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const Logo = styled.img`
  height: 39px;
`;

const Version = styled.span`
  float: right;
`;
