import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../components/nav/AdminNav';
import Orders from '../../components/order/Orders';
import { getAllOrders, updateOrderStatus } from '../../functions/admin';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    getAllOrders(user.token).then((res) => setOrders(res.data.orders));

  const updateStatus = (orderId, orderStatus) =>
    updateOrderStatus(user.token, orderId, orderStatus).then((res) =>
      loadAllOrders()
    );

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="dashboard" />
      </div>
      <div className="col-md-9 mt-4">
        <h4>Admin Dashboard</h4>
        <Orders orders={orders} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default AdminDashboard;
