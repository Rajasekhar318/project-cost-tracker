// File: src/store/localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('app_state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('app_state', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};
