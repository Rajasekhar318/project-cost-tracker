// src/utils/helpers.js
export const calculateTotalCost = (items, otherCosts) => {
  const itemSum = items.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const otherCostSum = otherCosts.reduce((sum, cost) => sum + Number(cost.amount || 0), 0);
  return itemSum + otherCostSum;
};
