import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({ num }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < num; i++) {
      totalCards.push(
        <Card key={i} className="col-md-4 mb-4">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };
  return cards();
};

export default LoadingCard;
