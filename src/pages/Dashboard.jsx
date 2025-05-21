// File: src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalCost, selectCostsCount, selectItemsCount } from '../store/selectors/totalCost';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import CostForm from '../components/CostForm';
import CostList from '../components/CostList';
import TotalCost from '../components/TotalCost';
import CostChart from '../components/CostChart';
import ItemChart from '../components/ItemChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([{ id: 1, name: 'Project-1' }]);
  const [activeProjectId, setActiveProjectId] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [activeView, setActiveView] = useState('overview');
  const total = useSelector(selectTotalCost);
  const itemsSum = useSelector(selectCostsCount);
  const itemsCount = useSelector(selectItemsCount);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !showSidebar) setShowSidebar(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSidebar]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = { id: newId, name: `Project-${newId}` };
    setProjects([...projects, newProject]);
    setActiveProjectId(newId);
  };

  const handleRemoveProject = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);

    if (activeProjectId === id && updatedProjects.length > 0) {
      setActiveProjectId(updatedProjects[0].id);
    } else if (updatedProjects.length === 0) {
      setActiveProjectId(null);
    }
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  const renderContent = () => {
    if (!activeProject) return <div style={styles.emptyState}>No projects available. Create one to get started.</div>;

    switch(activeView) {
      case 'overview':
        return (
          <div style={styles.contentArea}>
            <div style={styles.summaryCards}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryIcon}>💰</div>
                <div style={styles.summaryInfo}>
                  <div style={styles.summaryLabel}>Total Project Cost</div>
                  <div style={styles.summaryValue}>${total.toFixed(2)}</div>
                </div>
              </div>
              
              <div style={styles.summaryCard}>
                <div style={styles.summaryIcon}>💸</div>
                <div style={styles.summaryInfo}>
                  <div style={styles.summaryLabel}>No. of Other Costs</div>
                  <div style={styles.summaryValue}>{itemsSum}</div>
                </div>
              </div>
              
              <div style={styles.summaryCard}>
                <div style={styles.summaryIcon}>⏱️</div>
                <div style={styles.summaryInfo}>
                  <div style={styles.summaryLabel}>Active Items</div>
                  <div style={styles.summaryValue}>{itemsCount}</div>
                </div>
              </div>
              
              <div style={styles.summaryCard}>
                <div style={styles.summaryIcon}>🔄</div>
                <div style={styles.summaryInfo}>
                  <div style={styles.summaryLabel}>Progress</div>
                  <div style={styles.summaryValue}>49.8%</div>
                </div>
              </div>
            </div>
            
            <div style={styles.chartsRow}>
              <div style={styles.chartContainer}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Cost Breakdown</h3>
                  <div style={styles.cardActions}>
                    <select style={styles.select}>
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>Quarter</option>
                      <option>Year</option>
                    </select>
                  </div>
                </div>
                <CostChart />
              </div>
              
              <div style={styles.chartContainer}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Item Distribution</h3>
                  <button style={styles.iconButton}>⋮</button>
                </div>
                <ItemChart />
              </div>
            </div>
            
            <div style={styles.listSection}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Recent Costs</h3>
                <button style={styles.viewAllButton}>View All</button>
              </div>
              <CostList limit={5} />
            </div>
          </div>
        );
        
      case 'items':
        return (
          <div style={styles.contentArea}>
            <div style={styles.formContent}>
              <div style={styles.formCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Add New Item</h3>
                </div>
                <ItemForm />
              </div>
              <div style={styles.tableCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Items List</h3>
                  <div style={styles.searchContainer}>
                    <input 
                      type="text" 
                      placeholder="Search items..." 
                      style={styles.searchInput} 
                    />
                  </div>
                </div>
                <ItemList />
              </div>
            </div>
          </div>
        );
        
      case 'costs':
        return (
          <div style={styles.contentArea}>
            <div style={styles.formContent}>
              <div style={styles.formCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Add New Cost</h3>
                </div>
                <CostForm />
              </div>
              <div style={styles.tableCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Cost Entries</h3>
                  <div style={styles.filterControls}>
                    <select style={styles.filterSelect}>
                      <option>All Categories</option>
                      <option>Materials</option>
                      <option>Labor</option>
                      <option>Services</option>
                    </select>
                    <input type="date" style={styles.dateFilter} />
                  </div>
                </div>
                <CostList />
                <div style={styles.totalCostFooter}>
                  <TotalCost />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'analytics':
        return (
          <div style={styles.contentArea}>
            <div style={styles.analyticsHeader}>
              <h2 style={styles.analyticsTitle}>Project Analytics</h2>
              <div style={styles.analyticsControls}>
                <button style={styles.reportButton}>Export Report</button>
                <select style={styles.periodSelect}>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>
            
            <div style={styles.analyticsGrid}>
              <div style={styles.analyticsCard}>
                <h3 style={styles.analyticsCardTitle}>Cost Trends</h3>
                <CostChart />
              </div>
              
              <div style={styles.analyticsCard}>
                <h3 style={styles.analyticsCardTitle}>Item Analysis</h3>
                <ItemChart />
              </div>
              
              <div style={styles.analyticsCard}>
                <h3 style={styles.analyticsCardTitle}>Budget Variance</h3>
                <div style={styles.placeholderChart}>
                  Budget Variance Chart
                </div>
              </div>
              
              <div style={styles.analyticsCard}>
                <h3 style={styles.analyticsCardTitle}>Category Distribution</h3>
                <div style={styles.placeholderChart}>
                  Category Distribution Chart
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(showSidebar ? styles.sidebarOpen : styles.sidebarClosed)
      }}>
        <div style={styles.logoContainer}>
          <span style={styles.logoIcon}>📊</span>
          <h1 style={styles.logoText}>CostTracker</h1>
        </div>
        
        <div style={styles.navigationMenu}>
          <div 
            style={{
              ...styles.navItem,
              ...(activeView === 'overview' ? styles.activeNavItem : {})
            }}
            onClick={() => setActiveView('overview')}
          >
            <span style={styles.navIcon}>📈</span>
            <span style={styles.navText}>Overview</span>
          </div>
          
          <div 
            style={{
              ...styles.navItem,
              ...(activeView === 'items' ? styles.activeNavItem : {})
            }}
            onClick={() => setActiveView('items')}
          >
            <span style={styles.navIcon}>📦</span>
            <span style={styles.navText}>Items</span>
          </div>
          
          <div 
            style={{
              ...styles.navItem,
              ...(activeView === 'costs' ? styles.activeNavItem : {})
            }}
            onClick={() => setActiveView('costs')}
          >
            <span style={styles.navIcon}>💵</span>
            <span style={styles.navText}>Costs</span>
          </div>
          
          <div 
            style={{
              ...styles.navItem,
              ...(activeView === 'analytics' ? styles.activeNavItem : {})
            }}
            onClick={() => setActiveView('analytics')}
          >
            <span style={styles.navIcon}>📊</span>
            <span style={styles.navText}>Analytics</span>
          </div>
        </div>
        
        <div style={styles.projectsSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Projects</h3>
            <button 
              style={styles.addProjectButton} 
              onClick={handleAddProject}
              title="Add new project"
            >
              +
            </button>
          </div>
          
          <div style={styles.projectsList}>
            {projects.map(project => (
              <div
                key={project.id}
                style={{
                  ...styles.projectItem,
                  ...(project.id === activeProjectId ? styles.activeProjectItem : {})
                }}
                onClick={() => setActiveProjectId(project.id)}
              >
                <span style={styles.projectIcon}>📁</span>
                <span style={styles.projectName}>{project.name}</span>
                {projects.length > 1 && (
                  <button
                    style={styles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveProject(project.id);
                    }}
                    title="Remove project"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>U</div>
            <div style={styles.userDetails}>
              <div style={styles.userName}>User</div>
              <div style={styles.userEmail}>user@example.com</div>
            </div>
          </div>
          <button 
            style={styles.logoutButton} 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            {isMobile && (
              <button 
                style={styles.menuToggle}
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? '✕' : '☰'}
              </button>
            )}
            <h2 style={styles.pageTitle}>
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              {activeProject ? ` - ${activeProject.name}` : ''}
            </h2>
          </div>
          
          <div style={styles.headerRight}>
            <div style={styles.searchBar}>
              <span style={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search..." 
                style={styles.searchInput} 
              />
            </div>
            
            <div style={styles.headerIcons}>
              <button style={styles.iconButton} title="Notifications">🔔</button>
              <button style={styles.iconButton} title="Settings">⚙️</button>
              {!isMobile && (
                <button 
                  style={styles.profileButton}
                  onClick={handleLogout}
                >
                  <div style={styles.profileAvatar}>U</div>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    zIndex: 100,
    height: '100%',
    overflow: 'auto'
  },
  sidebarOpen: {
    width: '260px',
    minWidth: '260px'
  },
  sidebarClosed: {
    width: '0',
    minWidth: '0',
    padding: '0',
    overflow: 'hidden'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 20px',
    borderBottom: '1px solid #f1f5f9'
  },
  logoIcon: {
    fontSize: '24px',
    marginRight: '12px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0'
  },
  navigationMenu: {
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  activeNavItem: {
    backgroundColor: '#f1f5f9',
    color: '#4f46e5'
  },
  navIcon: {
    fontSize: '18px',
    marginRight: '12px',
    width: '20px',
    textAlign: 'center'
  },
  navText: {
    fontSize: '15px',
    fontWeight: '500'
  },
  projectsSection: {
    padding: '8px 12px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 8px 12px 8px'
  },
  sectionTitle: {
    fontSize: '14px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0'
  },
  addProjectButton: {
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#64748b',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  projectItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  activeProjectItem: {
    backgroundColor: '#e0e7ff',
    color: '#4f46e5'
  },
  projectIcon: {
    fontSize: '16px',
    marginRight: '8px'
  },
  projectName: {
    fontSize: '14px',
    fontWeight: '500',
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  removeButton: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#94a3b8',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'opacity 0.2s ease'
  },
  userSection: {
    borderTop: '1px solid #f1f5f9',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    marginRight: '12px'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b'
  },
  userEmail: {
    fontSize: '12px',
    color: '#64748b'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto'
  },
  header: {
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  menuToggle: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    marginRight: '12px',
    padding: '4px 8px',
    cursor: 'pointer'
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#94a3b8',
    fontSize: '14px'
  },
  searchInput: {
    padding: '8px 12px 8px 36px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    width: '220px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  headerIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    padding: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  profileButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center'
  },
  profileAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  },
  contentArea: {
    padding: '24px',
    flexGrow: 1,
    overflowY: 'auto'
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: '16px',
    color: '#64748b'
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  summaryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '16px'
  },
  summaryInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px'
  },
  summaryValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b'
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0'
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  select: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    outline: 'none'
  },
  listSection: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4f46e5',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '0'
  },
  formContent: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '24px'
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    height: 'fit-content'
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  filterControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  filterSelect: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    outline: 'none'
  },
  dateFilter: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    outline: 'none'
  },
  totalCostFooter: {
    marginTop: 'auto',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '16px',
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  analyticsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  analyticsTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0'
  },
  analyticsControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  reportButton: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  periodSelect: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    outline: 'none'
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
    gap: '24px'
  },
  analyticsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  analyticsCardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginTop: '0',
    marginBottom: '16px'
  },
  placeholderChart: {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    color: '#64748b',
    fontSize: '14px'
  }
};

export default Dashboard;