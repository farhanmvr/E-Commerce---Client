import React from 'react';
import { Button } from 'antd';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SingleProduct = ({ product }) => {
  const { title, description, price, images } = product;
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
        <h4>
          <strong>{title}</strong>
        </h4>
        <p>No rating yet</p>
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
      </div>
    </>
  );
};

export default SingleProduct;
