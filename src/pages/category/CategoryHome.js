import React, { useEffect, useState } from 'react';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="p-3 mt-5 display-5 alert alert-success">
              Loading...
            </h4>
          ) : (
            <h4 className="p-3 mt-5 display-5 alert alert-success">
              {category.name}
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((el) => (
          <div className="col-md-4 mb-4" key={el._id}>
            <ProductCard product={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
