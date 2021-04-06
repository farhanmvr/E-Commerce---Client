import { DeleteOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from '../../../functions/coupon';

const CreateCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [counpons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchAllCoupons();
  }, []);

  const fetchAllCoupons = () =>
    getCoupons().then((res) => setCoupons(res.data.coupons));

  const handleSubmit = () => {
    setLoading(true);
    createCoupon(user.token, { name, discount, expiry })
      .then((res) => {
        message.success('coupon created');
        setName('');
        setDiscount('');
        fetchAllCoupons();
      })
      .catch((err) => message.error('something went wrong'))
      .finally(() => setLoading(false));
  };

  const handleDelete = (c) => {
    removeCoupon(user.token, c)
      .then((res) => {
        message.success('Deleted');
        fetchAllCoupons();
      })
      .catch((err) => message.error('Something went wrong'));
  };

  const couponForm = () => (
    <form className="form-group">
      <label className="form-label mt-2">Name</label>
      <Input
        value={name}
        autoFocus
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="form-label mt-2">Discount (%)</label>
      <Input
        value={discount}
        autoFocus
        required
        type="number"
        onChange={(e) => setDiscount(e.target.value)}
      />
      <label className="form-label mt-2 d-block">Expiry</label>
      <DatePicker onChange={(_, date) => setExpiry(date)} />
      <Button onClick={handleSubmit} className="mt-3 d-block" size="large">
        {loading ? 'Saving...' : 'Create Coupon'}
      </Button>
    </form>
  );

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="coupons" />
      </div>
      <div className="col-md-5 mt-2">
        <h4>Create coupon</h4>
        {couponForm()}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="col">Name</th>
              <th className="col">Expiry</th>
              <th className="col">Discount(%)</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {counpons.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                <td>{c.discount}</td>
                <td>
                  <Popconfirm
                    title="Are you sure want to delete?"
                    onConfirm={() => handleDelete(c._id)}
                  >
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {categorylist} */}
      </div>
      {/* {contextHolder} */}
      {/* {editModel} */}
    </div>
  );
};

export default CreateCoupon;
