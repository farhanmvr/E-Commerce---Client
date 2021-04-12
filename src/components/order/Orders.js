import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const Orders = ({ updateStatus, orders }) => {
  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="mr-3 my-4 p-3 card">
        <p>Order Id : <span className='font-weight-bold'>{order._id}</span></p>
        {showOrderTable(order)}
        <p>Payment Id : {order.paymentIntent.id}</p>
        <p>Amount : ₹{order.paymentIntent.amount}</p>
        <p>Order Status: {showDropdown(order)}</p>
      </div>
    ));

  const showDropdown = (order) => (
    <Select
      defaultValue={order.orderStatus}
      style={{ width: '200' }}
      onChange={(val) => {
        updateStatus(order._id, val);
      }}
    >
      <Option value="Not Processed">Not Processed</Option>
      <Option value="Processing">Processing</Option>
      <Option value="Dispatched">Dispatched</Option>
      <Option value="Dispatched">Cancelled</Option>
      <Option value="Dispatched">Completed</Option>
    </Select>
  );

  const showOrderTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <strong>{p.product.title}</strong>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>{p.product.shipping}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <h4>{orders.length ? showEachOrders() : 'No orders'}</h4>;
};

export default Orders;
