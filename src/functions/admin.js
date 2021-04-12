import axios from 'axios';

export const getAllOrders = async (authtoken) =>
  axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const updateOrderStatus = async (authtoken, orderId, orderStatus) =>
  axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
