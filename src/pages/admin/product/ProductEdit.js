import React, { useEffect, useState } from 'react';

import ProductEditForm from '../../../components/forms/ProductEditForm';
import { getProduct, updateProduct } from '../../../functions/product';
import { getAllCategories, getCategorySubs } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const initialState = {
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  subs: [],
};

const ProductEdit = ({ visible, setVisible, slug }) => {
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [subArray, setSubArray] = useState([]);
  const [product, setProduct] = useState(initialState);
  const [fileList, setFileList] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getProduct(slug)
      .then((res) => {
        setProduct({
          ...product,
          ...res.data.product,
        });
        getAllCategories().then((res) => {
          setCategories([...categories, ...res.data.categories]);
        });
        getCategorySubs(res.data.product.category._id).then((r) => {
          let array = [];
          setSubOptions(r.data.subs);
          res.data.product.subs.map((el) => array.push(el._id));
          setSubArray(array);
          loadFileList(res.data.product.images);
        });
      })
      .catch((err) => setVisible(false));
  }, []);

  const submitHandler = (product) => {
    const category = product.category._id;
    let images = [];
    fileList.forEach((el) => {
      if (el.public_id && el.status === 'done') {
        images.push({
          public_id: el.public_id,
          url: el.thumbUrl,
        });
      }
    });
    const finalProduct = {
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      shipping: product.shipping,
      category,
      subs: subArray,
      images,
      color: product.color,
      brand: product.brand,
    };
    updateProduct(product.slug, finalProduct, user.token)
      .then((res) => {
        console.log(res.data);
        message.success('Product updated');
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => message.err(err.message));
  };

  const onClose = () => setVisible(false);

  const loadFileList = (imgs) => {
    let images = [];
    imgs.forEach((el) => {
      images.push({
        uid: el.public_id,
        status: 'done',
        thumbUrl: el.url,
        public_id: el.public_id,
      });
    });
    setFileList(images);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (val) => {
    getCategorySubs(val).then((res) => {
      setSubOptions(res.data.subs);
      setSubArray([]);
      setProduct({
        ...product,
        subs: [],
        category: { ...product.category, _id: val },
      });
    });
  };

  return (
    <ProductEditForm
      visible={visible}
      onClose={onClose}
      submitHandler={submitHandler}
      product={product}
      handleChange={handleChange}
      handleCategoryChange={handleCategoryChange}
      setProduct={setProduct}
      subArray={subArray}
      setSubArray={setSubArray}
      fileList={fileList}
      setFileList={setFileList}
      categories={categories}
      subOptions={subOptions}
    />
  );
};

export default ProductEdit;
