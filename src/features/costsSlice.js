// src/features/costsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const costsSlice = createSlice({
  name: 'costs',
  initialState: [],
  reducers: {
    addCost: (state, action) => {
      state.push(action.payload);
    },
    updateCost: (state, action) => {
      const index = state.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCost: (state, action) => {
      return state.filter(cost => cost.id !== action.payload);
    }
  }
});

export const { addCost, updateCost, deleteCost } = costsSlice.actions;
export default costsSlice.reducer;