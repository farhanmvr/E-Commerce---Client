import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-0'>
      <Input
        style={{ width: '20rem',borderRadius:'1rem' }}
        onPressEnter={handleSubmit}
        prefix={<SearchOutlined className="site-form-item-icon" />}
        onChange={handleChange}
        value={text}
        placeholder="search product"
      />
    </form>
  );
};

export default Search;
