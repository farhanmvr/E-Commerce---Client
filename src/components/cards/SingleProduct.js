import React from 'react';
import _ from 'lodash';
import { Button, Rate } from 'antd';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';

const SingleProduct = ({ product, onStarClicked, rating, setRating }) => {
  const { title, description, price, images } = product;
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in loacalstorage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicate
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem('cart', JSON.stringify(unique));
      // add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
    }
  };

  return (
    <>
      <div className="col-md-5 offset-md-1">
        <Carousel showArrows autoPlay infiniteLoop>
          {images &&
            images.map((image) => (
              <img alt={title} src={image.url} key={image.public_id} />
            ))}
        </Carousel>
      </div>
      <div className="col-md-5">
        <h4 className="mb-0">
          <strong>{title}</strong>
        </h4>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <p>No rating yet</p>
        )}
        <hr />
        <h5 className="font-weight-bold mb-0">{`Rs.${price}`}</h5>
        <p className="text-success">inclusive of all taxes</p>
        <p>
          <strong>{product.quantity} </strong>more available
        </p>
        <p className="mb-1">
          Shipping: <strong>{product.shipping}</strong>
        </p>
        <p className="mb-1">Color: {product.color}</p>
        <br />
        <Button
          onClick={handleAddCart}
          icon={<ShoppingOutlined />}
          style={{ width: '40%', backgroundColor: '#44484d', color: 'white' }}
          size="large"
        >
          Add to Cart
        </Button>
        <Button
          icon={<HeartOutlined />}
          className="ml-2"
          style={{ width: '30%' }}
          size="large"
        >
          Add to Wishlist
        </Button>
        <hr className="mt-4" />
        <p>PRODUCT DETAILS</p>
        <p style={{ textAlign: 'justify' }}>{description}</p>
        <RatingModal
          rating={rating}
          id={product._id}
          onStarClicked={onStarClicked}
        >
          <Rate
            onChange={(val) => setRating(val)}
            style={{ color: 'green' }}
            value={rating}
            allowHalf
          />
        </RatingModal>
      </div>
    </>
  );
};

export default SingleProduct;
