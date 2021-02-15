import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({ children, rating, id, onStarClicked }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  return (
    <>
      <p
        className="text-success"
        style={{ cursor: 'pointer' }}
        onClick={() =>
          user && user.token
            ? setVisible(true)
            : history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` },
              })
        }
      >
        Rate this product
      </p>
      <Modal
        onOk={() => {
          onStarClicked(id, rating, setVisible);
        }}
        onCancel={() => setVisible(false)}
        centered
        title="Leave your rating"
        visible={visible}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
