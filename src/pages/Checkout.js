import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import {
  getUserCart,
  saveUserAddress,
  getPriceAfterDiscount,
} from '../functions/user';
import { convertAmount } from '../functions/utils';
import 'react-quill/dist/quill.snow.css';

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user]);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address)
      .then((res) => {
        setIsSaved(true);
        message.success('address added');
      })
      .catch((err) => message.error('something went wrong'));
  };

  const applyCoupon = () => {
    getPriceAfterDiscount(user.token, coupon.toUpperCase())
      .then((res) => {
        message.success('Coupon Applid');
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      })
      .catch((err) => message.error(err.response.data.message));
  };

  return (
    <div className="container pt-4">
      <div className="row">
        {/* LEFT SECTION */}
        <div className="col-md-8">
          {/* Delivery Address */}
          <h5 className="font-weight-bold">Delivery Address</h5>
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <Button className="mt-3" onClick={saveAddressToDb}>
            SAVE
          </Button>
          <hr />
          {/* Coupon */}
          <h5 className="font-weight-bold">Apply Coupon</h5>
          <div className="row">
            <div className="col-5">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
            <div className="col-3 p-0">
              <Button onClick={applyCoupon} danger type="dashed">
                APPLY
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-4">
          <h5 className="font-weight-bold">Order Summary</h5>
          <hr />
          <p>PRICE DETAILS</p>
          {products.map((p, i) => {
            return (
              <div className="row" key={i}>
                <div className="col-8">
                  <p>
                    {p.product.title} ({p.count})
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  ₹{p.price * p.count}
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col-8 font-weight-bold">Total Price</div>
            <div className="col-4 font-weight-bold d-flex justify-content-end">
              ₹{total}
            </div>
          </div>
          {totalAfterDiscount > 0 && (
            <div className="row">
              <div className="col-8 font-weight-bold">Discount</div>
              <div className="col-4 font-weight-bold d-flex justify-content-end">
                - ₹{total - totalAfterDiscount}
              </div>
            </div>
          )}
          <div className="row">
            {/* Total */}
            <div className="border mx-2 py-2 w-100 text-center mt-2 border-primary">
              <h5 className="font-weight-bold m-0">
                ₹{' '}
                {totalAfterDiscount > 0
                  ? convertAmount(totalAfterDiscount)
                  : convertAmount(total)}
              </h5>
            </div>
          </div>
          <hr />
          <div className="row">
            {!user || !user.token ? (
              <Link
                className="d-flex justify-content-stretch col-12"
                to={{ pathname: '/login', state: { from: 'checkout' } }}
              >
                <Button
                  className="btn-block btn btn-dark"
                  style={{
                    backgroundColor: '#212529',
                    color: 'white',
                    border: 'none',
                  }}
                  size="large"
                >
                  LOGIN TO CHECKOUT
                </Button>
              </Link>
            ) : (
              <div className="col-12 d-flex justify-content-stretch">
                <Button
                  onClick={() => history.push('/payment')}
                  className="btn btn-block"
                  style={{
                    backgroundColor: '#212529',
                    color: 'white',
                    border: 'none',
                  }}
                  size="large"
                  disabled={!isSaved || !products.length}
                >
                  PLACE ORDER
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
