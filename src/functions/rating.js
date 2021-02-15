import { Rate } from 'antd';
import React from 'react';

export const showAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p && p.ratings;
    let total = [];
    const length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;
    return (
      <div>
        <span>
          <Rate
            className="text-success"
            allowHalf
            style={{ fontSize: '.8rem' }}
            value={result}
          />
        </span>
        <span className="ml-2">({length})</span>
      </div>
    );
  }
};
