import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeViewModal from '../components/EmployeeViewModal';
import Login from '../components/Login';
import exportToCSV from '../utils/exportCsv'; // Fixed: Default import instead of named import
import { 
  Users, UserCheck, Plus, Search, Eye,
  Edit3, Trash2, LayoutDashboard, Building, Briefcase, LogOut, ChevronDown, Download, DollarSign 
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ems_user')) || null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [viewEmp, setViewEmp] = useState(null);
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchAll = async () => {
    try {
      const res = await getEmployees({ search, department, status });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department, status, user]);

  const handleLogin = (userData) => {
    localStorage.setItem('ems_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('ems_user');
    setUser(null);
    setShowProfileMenu(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      fetchAll();
    }
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const activeCount = employees.filter(e => e.status === 'Active').length;
  const totalPayroll = employees.reduce((acc, curr) => acc + Number(curr.salary || 0), 0);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand-logo">
          <Building size={28} />
          EMS Portal
        </div>
        <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={20} /> Dashboard
        </div>
        <div className={`nav-item ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>
          <Users size={20} /> Employees
        </div>
        <div className={`nav-item ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => setActiveTab('departments')}>
          <Briefcase size={20} /> Departments
        </div>
      </aside>

      <main className="main-wrapper">
        <div className="top-bar">
          <div>
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Employee Dashboard'}
              {activeTab === 'employees' && 'All Employee Records'}
              {activeTab === 'departments' && 'Department Directory'}
            </h1>
            <span style={{ color: 'var(--text-muted)' }}>Welcome back, Admin</span>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="user-profile" style={{ cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="avatar">A</div>
              <span style={{ fontWeight: 600 }}>Admin Portal</span>
              <ChevronDown size={16} color="var(--text-muted)" />
            </div>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <strong style={{ display: 'block' }}>System Admin</strong>
                  <small style={{ color: 'var(--text-muted)' }}>{user.email}</small>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'departments' ? (
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h2>Department Directory</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {['IT', 'HR', 'Sales', 'Marketing'].map(dept => (
                <div key={dept} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', background: '#f8fafc' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#4f46e5' }}>{dept}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                    Total Staff: <strong>{employees.filter(e => e.department === dept).length}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="stats-container">
                <div className="stat-box">
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL EMPLOYEES</span>
                    <div className="stat-num">{employees.length}</div>
                  </div>
                  <div className="stat-icon icon-blue"><Users size={24} /></div>
                </div>

                <div className="stat-box">
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE NOW</span>
                    <div className="stat-num">{activeCount}</div>
                  </div>
                  <div className="stat-icon icon-green"><UserCheck size={24} /></div>
                </div>

                <div className="stat-box">
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL PAYROLL</span>
                    <div className="stat-num">₹{totalPayroll.toLocaleString()}</div>
                  </div>
                  <div className="stat-icon icon-blue"><DollarSign size={24} /></div>
                </div>
              </div>
            )}

            <div className="toolbar">
              <div className="search-box">
                <Search size={18} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <select className="filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>

                <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <button className="btn-cancel" onClick={() => exportToCSV(employees)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Download size={16} /> Export CSV
                </button>

                <button className="btn-add" onClick={() => { setSelectedEmp(null); setShowModal(true); }}>
                  <Plus size={18} /> Add Employee
                </button>
              </div>
            </div>

            <div className="glass-table-wrapper">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Dept</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>No employee records found.</td>
                    </tr>
                  ) : (
                    employees.map((emp) => (
                      <tr key={emp._id}>
                        <td><strong>{emp.name}</strong></td>
                        <td style={{ color: 'var(--text-muted)' }}>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.role}</td>
                        <td><span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>{emp.department}</span></td>
                        <td>₹{Number(emp.salary).toLocaleString()}</td>
                        <td>
                          <span className={`status-tag ${emp.status === 'Active' ? 'active' : 'inactive'}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-icon-btn edit" title="View Profile" onClick={() => setViewEmp(emp)}>
                            <Eye size={16} />
                          </button>
                          <button className="action-icon-btn edit" title="Edit Employee" onClick={() => { setSelectedEmp(emp); setShowModal(true); }}>
                            <Edit3 size={16} />
                          </button>
                          <button className="action-icon-btn delete" title="Delete Employee" onClick={() => handleDelete(emp._id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {showModal && (
        <EmployeeForm 
          employee={selectedEmp} 
          onClose={() => setShowModal(false)} 
          refresh={fetchAll} 
        />
      )}

      {viewEmp && (
        <EmployeeViewModal 
          employee={viewEmp} 
          onClose={() => setViewEmp(null)} 
        />
      )}
    </div>
  );
}