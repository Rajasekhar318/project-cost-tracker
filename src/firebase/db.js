// File: src/firebase/db.js
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import app from './config';

const db = getFirestore(app);

export const addItemToDB = async (userId, item) => {
  return await addDoc(collection(db, `users/${userId}/items`), item);
};

export const addCostToDB = async (userId, cost) => {
  return await addDoc(collection(db, `users/${userId}/costs`), cost);
};

export const updateItemInDB = async (userId, itemId, updatedData) => {
  const itemRef = doc(db, `users/${userId}/items/${itemId}`);
  return await updateDoc(itemRef, updatedData);
};

export const deleteItemFromDB = async (userId, itemId) => {
  const itemRef = doc(db, `users/${userId}/items/${itemId}`);
  return await deleteDoc(itemRef);
};

export const deleteCostFromDB = async (userId, costId) => {
  const costRef = doc(db, `users/${userId}/costs/${costId}`);
  return await deleteDoc(costRef);
};

export const getAllData = async (userId) => {
  const itemsSnapshot = await getDocs(collection(db, `users/${userId}/items`));
  const costsSnapshot = await getDocs(collection(db, `users/${userId}/costs`));

  const items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const costs = costsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { items, costs };
};
