import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, getRelated, productStar } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const { slug } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getProduct(slug)
      .then((res) => setProduct(res.data.product))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (product._id) {
      getRelated(product._id).then((res) => setRelated(res.data.products));
    }
  }, [product]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setRating(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const onStarClicked = (prodId, value, setVisible) =>
    productStar(prodId, value, user.token)
      .then((res) => {
        message.success('rating added');
        setVisible(false);
      })
      .catch((err) => message.error(err.message));

  return (
    <div className="container-fluid">
      {!loading && (
        <>
          <div className="row pt-4">
            <SingleProduct
              rating={rating}
              setRating={setRating}
              onStarClicked={onStarClicked}
              product={product}
            />
          </div>
          <div className="container-fluid">
            <div className="row mt-5">
              <h6 className="col-12 pb-3">RELATED PRODUCTS</h6>
              {related &&
                related.length > 0 &&
                related.map((el) => (
                  <div className="col-md-3">
                    <ProductCard key={el._id} product={el} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
