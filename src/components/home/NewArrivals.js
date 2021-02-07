import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';

import { getProducts, getProductCount } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProducts('CreatedAt', 'desc', page)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchTotalCount();
  }, []);

  const fetchTotalCount = () =>
    getProductCount()
      .then((res) => setProductsCount(res.data.total))
      .catch((err) => console.log(err.message));

  const productCards = () => {
    return products.map((prod) => (
      <div key={prod._id} className="col-md-4 mb-4">
        <ProductCard product={prod} />
      </div>
    ));
  };
  return (
    <div className="container">
      <div className="row">
        {loading ? <LoadingCard num={6} /> : productCards()}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center p-3">
          <Pagination
            current={page}
            total={(productsCount / 6) * 10}
            onChange={(val) => setPage(val)}
          />
        </nav>
      </div>
    </div>
  );
};

export default NewArrivals;
