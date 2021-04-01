import React, { useState } from 'react';
import { Badge, Menu } from 'antd';
import {
  DashboardOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../forms/Search';
import Avatar from 'antd/lib/avatar/avatar';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, cart } = useSelector((state) => state);

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
      <Item style={itemStyle} key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item
        style={itemStyle}
        key="cart"
        icon={
          <Badge count={cart.length}>
            <ShoppingCartOutlined />
          </Badge>
        }
      >
        <Link to="/cart">Cart</Link>
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
          icon={
            user.picture ? (
              <Avatar size={25} className="mr-2" src={user.picture} />
            ) : (
              <UserAddOutlined />
            )
          }
          title={user.email && user.email.split('@')[0]}
          className="float-right"
        >
          {user && user.role === 'subscriber' && (
            <Item icon={<DashboardOutlined />}>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item icon={<DashboardOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout} key="logout">
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
