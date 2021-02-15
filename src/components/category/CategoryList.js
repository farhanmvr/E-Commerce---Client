import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../functions/category';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((res) => setCategories(res.data.categories))
      .finally(() => setLoading(false));
  }, []);

  const showCategories = () =>
    categories.map((el) => (
      <div
        key={el._id}
        className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 col"
      >
        <Link to={`/category/${el.slug}`}>{el.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading....</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
