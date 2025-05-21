// File: src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/itemsSlice';
import costsReducer from '../features/costsSlice';
import authReducer from '../features/authSlice';
import { loadState, saveState } from './localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

const store = configureStore({
  reducer: {
    items: itemsReducer,
    costs: costsReducer,
    auth: authReducer,
  },
  preloadedState: persistedState, // preload with localStorage
});

// Subscribe to store updates and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState({
    items: state.items,
    costs: state.costs,
    auth: state.auth
  });
});

export default store;
