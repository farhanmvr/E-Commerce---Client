import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

const AdminDashboard = () => {

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="dashboard" />
      </div>
      <div className="col-md-9 mt-5">
        <h4>Admin Dashboard</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
