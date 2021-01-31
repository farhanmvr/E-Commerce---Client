import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    setCurrent('login');
    history.push('/login');
  };

  const itemStyle = { borderBottom: 'none' };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item style={itemStyle} key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item
          style={itemStyle}
          key="register"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <Link to="register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item
          style={itemStyle}
          key="login"
          icon={<LoginOutlined />}
          className="float-right"
        >
          <Link to="login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          style={itemStyle}
          key="username"
          icon={<UserOutlined />}
          title={user.email && user.email.split('@')[0]}
          className="float-right"
        >
          <Item icon={<LogoutOutlined />} onClick={logout} key="logout">
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
