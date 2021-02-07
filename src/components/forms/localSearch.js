import { FilterOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  return (
      <Input
        addonBefore={<FilterOutlined />}
        className="mb-3 "
        placeholder="Filter"
        value={keyword}
        onChange={handleSearch}
      />
  );
};

export default LocalSearch;
