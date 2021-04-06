import axios from 'axios';

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (authtoken, id) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${id}`, {
    headers: { authtoken },
  });

export const createCoupon = async (authtoken, coupon) =>
  await axios.post(`${process.env.REACT_APP_API}/coupon`, coupon, {
    headers: { authtoken },
  });
