// TotalCost.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalCost } from '../store/selectors/totalCost';

const TotalCost = () => {
  const total = useSelector(selectTotalCost);

  return (
    <div>
      <h3>Total Project Cost: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default TotalCost;
