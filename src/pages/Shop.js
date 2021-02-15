import React, { useEffect, useState } from 'react';
import {
  fetchProductByFilter,
  getAllProductsByCount,
} from '../functions/product';
import { getAllCategories } from '../functions/category';
import ProductCard from '../components/cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Slider } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 200000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // load on default
  useEffect(() => {
    setLoading(true);
    getAllProductsByCount(12)
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
    getAllCategories().then((res) => setCategories(res.data.categories));
  }, []);

  // load on search
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProductByFilter({ query: text }).then((res) =>
        setProducts(res.data.products)
      );
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // load on change in price range
  useEffect(() => {
    fetchProductByFilter({ price }).then((res) =>
      setProducts(res.data.products)
    );
  }, [ok]);

  const handleSlider = (val) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(val);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // load based on category
  // show categories in a list of checkbox
  const showCategories = () => (
    <div className="pt-2">
      {categories.map((c) => (
        <div key={c._id}>
          <Checkbox className="pb-2 pl-4 pr-4" value={c._id} name="category">
            {c.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-4">
          <h6>Search / Filter</h6>
          <hr />
          <Menu mode="inline" defaultOpenKeys={['1', '2']}>
            {/* Price */}
            <Menu.SubMenu key="1" title={<span className="h6">Price</span>}>
              <div>
                <Slider
                  max="200000"
                  className="ml-4 mr-4"
                  tipFormatter={(val) => `₹${val}`}
                  range
                  value={price}
                  onChange={(val) => handleSlider(val)}
                />
              </div>
            </Menu.SubMenu>
            {/* Category */}
            <Menu.SubMenu key="2" title={<span className="h6">Category</span>}>
              {showCategories()}
            </Menu.SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 mt-4">
          {loading ? (
            <h4>Loading....</h4>
          ) : (
            <h4 className="text-primary">Products</h4>
          )}
          {products.length < 1 ? (
            <p> No products found </p>
          ) : (
            <div className="row">
              {products.map((el) => (
                <div className="col-md-4 mb-4" key="el_id">
                  <ProductCard product={el} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
