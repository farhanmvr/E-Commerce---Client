import React, { useEffect, useState } from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct } from '../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getProduct(slug)
      .then((res) => setProduct(res.data.product))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="container-fluid">
      {!loading && (
        <>
          <div className="row pt-4">
            <SingleProduct product={product} />
          </div>
          <div className="row pt-4"></div>
        </>
      )}
    </div>
  );
};

export default Product;
