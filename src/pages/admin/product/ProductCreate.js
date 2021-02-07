import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AdminNav from '../../../components/nav/AdminNav';
import { createProduct } from '../../../functions/product';
import { getAllCategories, getCategorySubs } from '../../../functions/category';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  shipping: 'No',
  quantity: '',
  subs: [],
  images: [],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);

  // image upload
  const [fileList, setFileList] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((res) =>
      setValues({ ...initialState, categories: res.data.categories })
    );

  const handleCategoryChange = (val) => {
    getCategorySubs(val).then((res) => {
      setSubOptions(res.data.subs);
      setValues({ ...values, subs: [], category: val });
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const extractImages = () => {
    let images = [];
    fileList.forEach((el) => {
      if (el.status === 'done' && el.public_id) {
        images.push({
          url: el.thumbUrl,
          public_id: el.public_id,
        });
      }
    });
    setValues({ ...values, images: images });
  };

  const handleSubmit = () => {
    extractImages();
    if (
      !values.title.trim() ||
      !values.price ||
      !values.description.trim() ||
      !values.quantity ||
      !values.color ||
      !values.brand ||
      !values.category ||
      !values.subs ||
      !values.images ||
      values.images.length <= 0
    )
      return message.error('All fields are required');
    createProduct(user.token, values)
      .then((res) => {
        message.success('Product Created');
        setValues(initialState);
        setFileList([]);
        loadCategories();
      })
      .catch((err) => message.error(err.message ?? 'Something went wrong'));
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="product" />
      </div>
      <div className="col-md-5 mt-2">
        <h4>Create product</h4>
        <ProductCreateForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          handleCategoryChange={handleCategoryChange}
          subOptions={subOptions}
          fileList={fileList}
          setFileList={setFileList}
        />
      </div>
    </div>
  );
};

export default ProductCreate;
