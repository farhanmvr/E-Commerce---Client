import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { message, Modal } from 'antd';

import { getAllProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [modal, contextHolder] = Modal.useModal();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () =>
    getAllProductsByCount(100)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));

  const deleteHandler = (slug) => {
    modal.confirm({
      title: 'Do you want to delete?',
      onOk: () => {
        removeProduct(slug, user.token)
          .then((res) => {
            message.success('Deleted');
            loadAllProducts();
          })
          .catch((err) => message.error(err.message ?? 'Something went wrong'));
      },
    });
  };

  const editHandler = () => {};

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="allProducts" />
      </div>
      <div className="col-md-10 mt-5">
        <h4>Products List</h4>
        <div className="row ">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 pb-4 justify-content-center"
            >
              <AdminProductCard
                deleteHandler={deleteHandler}
                key={prod._id}
                product={prod}
                editHandler={editHandler}
              />
            </div>
          ))}
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default AllProducts;
