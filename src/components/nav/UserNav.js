import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const UserNav = (props) => {
  return (
    <Menu
      style={{ width: '100%' }}
      defaultSelectedKeys={props.selectKey}
      defaultOpenKeys={props.selectKey}
      mode="inline"
    >
      <Menu.Item key="history">
        <Link to="/user/history">History</Link>
      </Menu.Item>
      <Menu.Item key="password">
        <Link to="/user/password">Password</Link>
      </Menu.Item>
      <Menu.Item key="wishlist">
        <Link to="/user/wishlist">Wishlist</Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserNav;
