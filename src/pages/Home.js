import React from 'react';
import BestSellers from '../components/home/BestSellers';

import NewArrivals from '../components/home/NewArrivals';

const Home = () => {
  return (
    <>
      <div className="alert alert-success  pt-3 p-1 ">
        <h4 style={{fontSize:'1.3rem'}} className="container"> New Arrivals </h4>
      </div>
      <NewArrivals />
      <div className="alert alert-danger mt-4 pt-3 p-1 ">
        <h4 style={{fontSize:'1.3rem'}} className="container"> Best Sellers </h4>
      </div>
      <BestSellers />
    </>
  );
};

export default Home;
