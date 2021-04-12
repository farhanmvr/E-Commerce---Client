import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getUserOrders(user.token).then((res) => setOrders(res.data.orders));

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="mr-3 my-4 p-3 card">
        {showOrderTable(order)}
        <p className="d-block">
          Status{' '}
          <span className="badge bg-success text-white">
            {order.orderStatus}
          </span>
        </p>
        <div className="row">
          <div className="col">{showDownlodLink(order)}</div>
        </div>
      </div>
    ));

  const showDownlodLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-outline-primary"
    >
      Download Invoice
    </PDFDownloadLink>
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

  return (
    <div className="row">
      <div className="col-md-3">
        <UserNav selectKey="history" />
      </div>
      <div className="col-md-9">
        <h4>
          {orders.length ? showEachOrders() : "You don't have any orders"}
        </h4>
      </div>
    </div>
  );
};

export default History;
