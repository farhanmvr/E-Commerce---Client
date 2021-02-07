import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const AdminNav = (props) => {
  return (
    <Menu
      style={{ width: '100%' }}
      defaultSelectedKeys={props.selectKey}
      defaultOpenKeys={props.selectKey}
      mode="inline"
    >
      <Menu.Item key="dashboard">
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="product">
        <Link to="/admin/product">Product</Link>
      </Menu.Item>
      <Menu.Item key="allProducts">
        <Link to="/admin/products">Products</Link>
      </Menu.Item>
      <Menu.Item key="category">
        <Link to="/admin/category">Category</Link>
      </Menu.Item>
      <Menu.Item key="subCategory">
        <Link to="/admin/sub">Sub Category</Link>
      </Menu.Item>
      <Menu.Item key="coupons">
        <Link to="/admin/coupons">Coupons</Link>
      </Menu.Item>
      <Menu.Item key="password">
        <Link to="/admin/password">Password</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
