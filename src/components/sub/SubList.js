import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSubCategories } from '../../functions/sub';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllSubCategories()
      .then((res) => setSubs(res.data.subCategories))
      .finally(() => setLoading(false));
  }, []);

  const showSubCategories = () =>
    subs.map((el) => (
      <div
        key={el._id}
        className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3 col"
      >
        <Link to={`/sub/${el.slug}`}>{el.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading....</h4>
        ) : (
          showSubCategories()
        )}
      </div>
    </div>
  );
};

export default SubList;
