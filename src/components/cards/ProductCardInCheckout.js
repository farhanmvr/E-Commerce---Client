import React from 'react';
import { Button, Input, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();

  const handlePriceChange = (op) => {
    if (p.quantity < p.count + op) return;
    if (op === -1 && p.count < 2) return;
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.forEach((prod, i) => {
        if (prod._id === p._id) cart[i].count += op;
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleDelete = () => {
    let cart;
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.forEach((prod, i) => {
        if (prod._id === p._id) cart.splice(i, 1);
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr className="text-center cart-table">
        <td>
          {p.images.length ? (
            <img
              style={{ height: 'auto', width: '8rem' }}
              alt={p.title}
              src={p.images[0].url}
              className="img"
            ></img>
          ) : (
            <img alt={p.title}></img>
          )}
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>{p.color}</td>
        <td>
          <Button
            onClick={() => {
              handlePriceChange(-1);
            }}
            disabled={p.count < 2}
            shape="circle"
          >
            -
          </Button>
          <Input
            value={p.count}
            className="mx-2 text-center"
            type="text"
            contentEditable={false}
            style={{ width: '3rem' }}
          />
          <Button
            disabled={p.quantity < p.count + 1}
            onClick={() => handlePriceChange(1)}
            shape="circle"
          >
            +
          </Button>
        </td>
        <td>{p.shipping}</td>
        <td>
          <Popconfirm
            onConfirm={handleDelete}
            title="Are you sure want to remove this item ?"
            placement="bottom"
            icon={<DeleteOutlined style={{ color: 'red' }} />}
          >
            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
          </Popconfirm>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
