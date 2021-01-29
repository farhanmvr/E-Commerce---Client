import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const itemStyle = { borderBottom: 'none' };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item style={itemStyle} key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item
        style={itemStyle}
        key="register"
        icon={<UserAddOutlined />}
        className="float-right"
      >
        <Link to="register">Register</Link>
      </Item>
      <Item
        style={itemStyle}
        key="login"
        icon={<LoginOutlined />}
        className="float-right"
      >
        <Link to="login">Login</Link>
      </Item>

      {/* <SubMenu key="username" icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu> */}
    </Menu>
  );
};

export default Header;
