import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  let total = 0;

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const saveDataToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.status === 'success') history.push('/checkout');
      })
      .catch((err) => console.log('cart save error'));
  };

  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-9 border-right">
          <h5 className="font-weight-bold">Cart ({cart.length} Items)</h5>
          {!cart.length ? (
            <h5>
              Your Cart Is Empty, <Link to="/shop">Continue Shopping</Link>
            </h5>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-3">
          <h5 className="font-weight-bold">Order Summary</h5>
          <hr />
          <p>PRICE DETAILS</p>
          {cart.map((c, i) => {
            total += c.price * c.count;
            return (
              <div className="row" key={i}>
                <div className="col-8">
                  <p>
                    {c.title} ({c.count})
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  ₹{c.price * c.count}
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
          <hr />
          <div className="row">
            {!user || !user.token ? (
              <Link
                className="d-flex justify-content-stretch col-12"
                to={{ pathname: '/login', state: { from: 'cart' } }}
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
                  onClick={saveDataToDb}
                  className="btn btn-dark btn-block"
                  style={{
                    backgroundColor: '#212529',
                    color: 'white',
                    border: 'none',
                  }}
                  size="large"
                  disabled={!cart.length || !user}
                >
                  CONTINUE TO CHECKOUT
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
