import { Button, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
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
      <Link to={`/product/${product.slug}`}>
        <Button
          icon={<ShoppingCartOutlined />}
          className="px-4"
          style={{ backgroundColor: '#44484d', color: 'white' }}
        >
          Add to Cart
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
