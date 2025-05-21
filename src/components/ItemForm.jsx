// src/components/ItemForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/itemsSlice';
import { v4 as uuidv4 } from 'uuid';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !cost.trim()) return;
    
    dispatch(addItem({ 
      id: uuidv4(), 
      name, 
      cost: parseFloat(cost), 
      timestamp: new Date().toISOString() 
    }));
    setName('');
    setCost('');
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>
        <span style={styles.icon}>➕</span> Add New Item
      </h3>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="item-name" style={styles.label}>Item Name</label>
          <input 
            id="item-name"
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="What did you buy?" 
            style={styles.input}
            required 
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="item-cost" style={styles.label}>Cost (₹)</label>
          <input 
            id="item-cost"
            value={cost} 
            onChange={e => setCost(e.target.value)} 
            placeholder="0.00" 
            type="number" 
            min="0"
            step="0.01"
            style={styles.input}
            required 
          />
        </div>
        
        <button type="submit" style={styles.submitButton}>
          Add Item
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '24px',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    marginTop: '0',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '8px',
    alignSelf: 'flex-end',
  },
};

export default ItemForm;