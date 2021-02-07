import React from 'react';
import UserNav from '../../components/nav/UserNav';

const History = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <UserNav selectKey="history" />
      </div>
      <div className="offset-md-2 col-md-5 mt-2">
        <h4>History</h4>
      </div>
    </div>
  );
};

export default History;
