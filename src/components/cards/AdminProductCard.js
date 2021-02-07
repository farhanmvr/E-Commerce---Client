import React, { useState } from 'react';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProductEdit from '../../pages/admin/product/ProductEdit';

const { Meta } = Card;

const AdminProductCard = ({ product, editHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false);
  const { title, description, images, slug } = product;

  return (
    <>
      <Card
        style={{ width: '90%' }}
        cover={
          <img
            alt="product"
            style={{ width: '100%', objectFit: 'cover', height: '200px' }}
            src={images[0].url}
          />
        }
        actions={[
          <EditOutlined
            onClick={() => setVisible(true)}
            style={{ color: 'blueviolet' }}
            key="edit"
          />,
          <DeleteOutlined
            onClick={() => deleteHandler(product.slug)}
            style={{ color: 'red' }}
            key="delete"
          />,
        ]}
      >
        <Meta
          title={title}
          description={`${description.substring(0, 55)}...`}
        />
      </Card>

      {visible && (
        <ProductEdit visible={visible} setVisible={setVisible} slug={slug} />
      )}
    </>
  );
};

export default AdminProductCard;
