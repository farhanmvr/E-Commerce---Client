import React, { useEffect, useState } from 'react';
import {
  fetchProductByFilter,
  getAllProductsByCount,
} from '../functions/product';
import { getAllSubCategories } from '../functions/sub';
import { getAllCategories } from '../functions/category';
import ProductCard from '../components/cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Radio, Slider } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 200000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState(0);
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'];
  const [brand, setBrand] = useState('');
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // LOAD ON DEFAULT
  useEffect(() => {
    setLoading(true);
    // fetch all products
    getAllProductsByCount(12)
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
    getAllCategories().then((res) => setCategories(res.data.categories));
    // fetch subs
    getAllSubCategories().then((res) => setSubs(res.data.subCategories));
  }, []);

  // LOAD ON SEARCH
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProductByFilter({ query: text }).then((res) =>
        setProducts(res.data.products)
      );
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // LOAD ON CHANGE IN PRICE
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
    setCategoryIds([]);
    setStar(0);
    setSub('');
    setBrand('');
    setShipping('');
    setColor('');

    setPrice(val);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // LOAD BY CATEGORY
  const showCategories = () => (
    <div className="pt-2">
      {categories.map((c) => (
        <div key={c._id}>
          <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4"
            value={c._id}
            name="category"
            checked={categoryIds.includes(c._id) ? true : false}
          >
            {c.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 200000]);
    setStar(0);
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // return index or -1

    // if not found -1 else return index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);

    fetchProductByFilter({ category: inTheState }).then((res) =>
      setProducts(res.data.products)
    );
  };

  // LOAD BY RATING
  const showRatings = () => (
    <div className="pt-2">
      <Radio.Group defaultValue={star} onChange={handleStarClick}>
        <Radio.Button value={5}>5</Radio.Button>
        <Radio.Button value={4}>4</Radio.Button>
        <Radio.Button value={3}>3</Radio.Button>
        <Radio.Button value={2}>2</Radio.Button>
        <Radio.Button value={1}>1</Radio.Button>
      </Radio.Group>
    </div>
  );

  const handleStarClick = (e) =>
    fetchProductByFilter({ stars: e.target.value })
      .then((res) => {
        setProducts(res.data.products);
        setCategoryIds([]);
        setPrice([0, 200000]);
        setStar(e.target.value);
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
      })
      .catch((err) => console.log(err));

  // LOAD BY SUB CATEGORY
  const showSubs = () =>
    subs.map((s) => {
      let style = 'p-2 m-1 badge';
      return (
        <div
          key={s._id}
          onClick={() => handleSubs(s._id)}
          className={
            sub === s._id
              ? style + ' badge-primary'
              : style + ' badge-secondary'
          }
          style={{ cursor: 'pointer' }}
        >
          {s.name}
        </div>
      );
    });

  const handleSubs = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 200000]);
    setStar(0);
    setCategoryIds([]);
    setSub(sub);
    setBrand('');
    setColor('');
    setShipping('');
    fetchProductByFilter({ sub }).then((res) => setProducts(res.data.products));
  };

  // LOAD BY BRANDS
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-1 pr-4 d-block"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setBrand(e.target.value);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 200000]);
    setStar(0);
    setCategoryIds([]);
    setSub('');
    setColor('');
    setShipping('');
    fetchProductByFilter({ brand: e.target.value }).then((res) =>
      setProducts(res.data.products)
    );
  };

  // LOAD BY COLORS
  const showColors = () =>
    colors.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === color}
        onChange={handleColor}
        className="pb-1 pl-1 pr-4 d-block"
      >
        {b}
      </Radio>
    ));

  const handleColor = (e) => {
    setColor(e.target.value);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 200000]);
    setStar(0);
    setCategoryIds([]);
    setSub('');
    setBrand('');
    setShipping('');
    fetchProductByFilter({ color: e.target.value }).then((res) =>
      setProducts(res.data.products)
    );
  };

  // LOAD BY SHIPPING
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-2 pr-4"
        onChange={handleShipping}
        value="Yes"
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-2 pr-4"
        onChange={handleShipping}
        value="No"
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  );

  const handleShipping = (e) => {
    setColor(e.target.value);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 200000]);
    setStar(0);
    setCategoryIds([]);
    setSub('');
    setBrand('');
    setShipping(e.target.value);
    fetchProductByFilter({ shipping: e.target.value }).then((res) =>
      setProducts(res.data.products)
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-4">
          <h6>Search / Filter</h6>
          <hr />
          <Menu
            mode="inline"
          >
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
            <Menu.SubMenu key="2" title={<span className="h6">Category</span>}>
              {showCategories()}
            </Menu.SubMenu>
            <Menu.SubMenu key="3" title={<span className="h6">Ratings</span>}>
              {showRatings()}
            </Menu.SubMenu>
            <Menu.SubMenu
              key="4"
              title={<span className="h6">Sub Category</span>}
            >
              {showSubs()}
            </Menu.SubMenu>
            <Menu.SubMenu key="5" title={<span className="h6">Brands</span>}>
              {showBrands()}
            </Menu.SubMenu>
            <Menu.SubMenu key="6" title={<span className="h6">Colors</span>}>
              {showColors()}
            </Menu.SubMenu>
            <Menu.SubMenu key="7" title={<span className="h6">Shipping</span>}>
              {showShipping()}
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
                <div className="col-md-4 mb-4" key={el._id}>
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
