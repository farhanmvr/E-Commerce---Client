import { Button, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // REDUX
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
    <Card
      style={{ width: '90%' }}
      cover={
        <img
          alt="product"
          style={{ width: '100%', objectFit: 'cover', height: '200px' }}
          src={product.images[0].url}
        />
      }
    >
      <Meta
        title={
          <Link color="black" to={`/product/${product.slug}`}>
            {product.title}
          </Link>
        }
        description={`${product.description.substring(0, 55)}...`}
      />
      <h6 className="mt-3">
        <strong>{`₹${product.price}`}</strong>
      </h6>
      {product.quantity < 1 ? (
        <p className='text-danger'>Out of stock</p>
      ) : (
        <Button
          onClick={handleAddCart}
          disabled={product.quantity < 1}
          icon={<ShoppingCartOutlined />}
          className="px-4"
          style={{ backgroundColor: '#44484d', color: 'white' }}
        >
          Add to Cart
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
