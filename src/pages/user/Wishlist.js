import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../../components/nav/UserNav';
import { getAllWishList, removeFromWishlist } from '../../functions/user';
import ProductCard from '../../components/cards/ProductCard';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllWishlist();
  }, [user]);

  const loadAllWishlist = () =>
    getAllWishList(user.token).then((res) => setWishlist(res.data.wishlist));

  const handleRemove = (id) =>
    removeFromWishlist(user.token, id).then((res) => {
      message.success('Deleted');
      loadAllWishlist();
    });

  return (
    <div className="row">
      <div className="col-md-3">
        <UserNav selectKey="wishlist" />
      </div>
      <div className="col-md-5 mt-2">
        <h4>WishList</h4>
        {wishlist.map((p) => (
          <div className="alert alert-secondary" key={p._id}>
            <Link to={`/product/${p.slug}`}>{p.title}</Link>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => handleRemove(p._id)}
              className="btn btn-sm float-right"
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
