// src/store/selectors/totalCost.js
import { createSelector } from 'reselect';

// simple input-selectors
const itemsSelector = state => state.items;
const costsSelector = state => state.costs;

// your total-cost logic as a reselect selector
export const selectTotalCost = createSelector(
  [ itemsSelector, costsSelector ],
  (items, costs) =>
    [ ...items, ...costs ]
      .reduce((acc, cur) => acc + Number(cur.cost ?? cur.amount), 0)
);

// SUM of *only* items (assuming each item has an `amount` field)
export const selectCostsCount = createSelector(
  [ costsSelector ],
  costs => costs.length
);

// COUNT of items
export const selectItemsCount = createSelector(
  [ itemsSelector ],
  items => items.length
);