import React from 'react';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <>
      <div className="alert alert-success  pt-3 p-1 ">
        <h4 style={{ fontSize: '1.3rem' }} className="container">
          New Arrivals
        </h4>
      </div>
      <NewArrivals />
      <div className="alert alert-danger mt-4 pt-3 p-1 ">
        <h4 style={{ fontSize: '1.3rem' }} className="container">
          Best Sellers
        </h4>
      </div>
      <BestSellers />
      <div className="alert alert-primary mt-4 pt-3 p-1 ">
        <h4 style={{ fontSize: '1.3rem' }} className="container">
          Categories
        </h4>
      </div>
      <CategoryList />
      <div className="alert alert-success mt-4 pt-3 p-1 ">
        <h4 style={{ fontSize: '1.3rem' }} className="container">
          Sub Categories
        </h4>
      </div>
      <SubList />
    </>
  );
};

export default Home;
