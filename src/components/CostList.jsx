import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCost, updateCost } from '../features/costsSlice';

const CostList = () => {
  const costs = useSelector(state => state.costs || []);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [sortBy, setSortBy] = useState('');
  const [minCost, setMinCost] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [filtersActive, setFiltersActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const startEdit = (cost) => {
    setEditId(cost.id);
    setEditDescription(cost.description);
    setEditAmount(cost.amount);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditDescription('');
    setEditAmount('');
  };

  const submitEdit = () => {
    if (!editDescription.trim() || !editAmount) return;
    
    dispatch(updateCost({
      id: editId,
      description: editDescription,
      amount: parseFloat(editAmount)
    }));
    setEditId(null);
    setEditDescription('');
    setEditAmount('');
  };

  const resetFilters = () => {
    setSortBy('');
    setMinCost('');
    setMaxCost('');
    setFiltersActive(false);
  };

  const applyFilters = (list) => {
    let filtered = [...list];

    if (minCost !== '') {
      filtered = filtered.filter(cost => cost.amount >= parseFloat(minCost));
    }

    if (maxCost !== '') {
      filtered = filtered.filter(cost => cost.amount <= parseFloat(maxCost));
    }

    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.description.localeCompare(a.description));
        break;
      case 'cost-asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'cost-desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      default:
        // Default to sorting by newest date
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }

    return filtered;
  };

  const displayedCosts = filtersActive ? applyFilters(costs) : applyFilters(costs);
  const totalAmount = displayedCosts.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleWrapper}>
          <h3 style={styles.title}>
            <span style={styles.icon}>💰</span> Other Expenses
            {displayedCosts.length > 0 && (
              <span style={styles.count}>{displayedCosts.length}</span>
            )}
          </h3>
          {displayedCosts.length > 0 && (
            <div style={styles.totalCost}>
              Total: <span style={styles.costValue}>₹{totalAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          style={styles.filterButton}
          aria-expanded={showFilters}
        >
          {showFilters ? 'Hide Filters' : 'Filter & Sort'} 
          <span style={styles.filterIcon}>⚙️</span>
        </button>
      </div>

      {showFilters && (
        <div style={styles.filterContainer}>
          <div style={styles.filterControls}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => { 
                  setSortBy(e.target.value); 
                  setFiltersActive(true); 
                }}
                style={styles.select}
              >
                <option value="">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Description (A-Z)</option>
                <option value="name-desc">Description (Z-A)</option>
                <option value="cost-asc">Amount (Low to High)</option>
                <option value="cost-desc">Amount (High to Low)</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Amount Range:</label>
              <div style={styles.rangeInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minCost}
                  onChange={(e) => { 
                    setMinCost(e.target.value); 
                    setFiltersActive(true); 
                  }}
                  style={styles.rangeInput}
                />
                <span style={styles.rangeSeparator}>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxCost}
                  onChange={(e) => { 
                    setMaxCost(e.target.value); 
                    setFiltersActive(true); 
                  }}
                  style={styles.rangeInput}
                />
              </div>
            </div>
          </div>
          
          {filtersActive && (
            <button onClick={resetFilters} style={styles.resetButton}>
              Reset Filters
            </button>
          )}
        </div>
      )}

      {displayedCosts.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No expenses to display</p>
          <p style={styles.emptySubtext}>Add your first expense using the form above</p>
        </div>
      ) : (
        <ul style={styles.list}>
          {displayedCosts.map(cost => (
            <li key={cost.id} style={styles.listItem}>
              {editId === cost.id ? (
                <div style={styles.editForm}>
                  <div style={styles.editInputs}>
                    <input 
                      value={editDescription} 
                      onChange={e => setEditDescription(e.target.value)} 
                      placeholder="Description"
                      style={styles.editInput} 
                    />
                    <input 
                      type="number" 
                      value={editAmount} 
                      onChange={e => setEditAmount(e.target.value)} 
                      placeholder="Amount"
                      min="0"
                      step="0.01"
                      style={styles.editInput} 
                    />
                  </div>
                  <div style={styles.editActions}>
                    <button onClick={cancelEdit} style={styles.cancelButton}>
                      Cancel
                    </button>
                    <button onClick={submitEdit} style={styles.saveButton}>
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div style={styles.itemContent}>
                  <div style={styles.itemDetails}>
                    <div style={styles.itemCategory}>
                      <div style={styles.itemCategoryIcon}>💸</div>
                      <div style={styles.itemName}>{cost.description}</div>
                    </div>
                    <div style={styles.itemCost}>₹{cost.amount.toFixed(2)}</div>
                    <div style={styles.itemDate}>
                      {new Date(cost.timestamp).toLocaleDateString()} at {new Date(cost.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  <div style={styles.itemActions}>
                    <button onClick={() => startEdit(cost)} style={styles.editButton}>
                      <span style={styles.buttonIcon}>✏️</span>
                      <span style={styles.buttonText}>Edit</span>
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Delete "${cost.description}"?`)) {
                          dispatch(deleteCost(cost.id))
                        }
                      }} 
                      style={styles.deleteButton}
                    >
                      <span style={styles.buttonIcon}>🗑️</span>
                      <span style={styles.buttonText}>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
  count: {
    marginLeft: '10px',
    backgroundColor: '#e6fffa',
    color: '#38a169',
    borderRadius: '16px',
    padding: '2px 10px',
    fontSize: '14px',
    fontWeight: '500',
  },
  totalCost: {
    marginTop: '4px',
    fontSize: '15px',
    color: '#4a5568',
  },
  costValue: {
    fontWeight: '600',
    color: '#2d3748',
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filterIcon: {
    marginLeft: '6px',
  },
  filterContainer: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
  },
  filterControls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  filterGroup: {
    flex: '1 1 200px',
  },
  filterLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#4a5568',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  rangeInputs: {
    display: 'flex',
    alignItems: 'center',
  },
  rangeInput: {
    flex: '1',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
  },
  rangeSeparator: {
    margin: '0 8px',
    color: '#718096',
  },
  resetButton: {
    backgroundColor: 'transparent',
    color: '#38a169',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '14px',
    marginTop: '12px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    borderBottom: '1px solid #edf2f7',
    padding: '16px 0',
  },
  itemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: '1',
  },
  itemCategory: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },
  itemCategoryIcon: {
    fontSize: '16px',
    marginRight: '8px',
    backgroundColor: '#e6fffa',
    color: '#38a169',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#2d3748',
  },
  itemCost: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#38a169',
    marginBottom: '4px',
    marginLeft: '36px',
  },
  itemDate: {
    fontSize: '13px',
    color: '#718096',
    marginLeft: '36px',
  },
  itemActions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fefcbf',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#744210',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fed7d7',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#9b2c2c',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  buttonIcon: {
    marginRight: '4px',
    fontSize: '12px',
  },
  buttonText: {
    fontSize: '14px',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  editInputs: {
    display: 'flex',
    gap: '12px',
  },
  editInput: {
    flex: '1',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
  },
  editActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  cancelButton: {
    backgroundColor: '#edf2f7',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#38b2ac',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    cursor: 'pointer',
  },
  emptyState: {
    padding: '32px 0',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#4a5568',
    margin: '0 0 8px 0',
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#718096',
    margin: '0',
  },
};

export default CostList;