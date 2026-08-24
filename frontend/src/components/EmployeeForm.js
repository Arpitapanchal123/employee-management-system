import React, { useState } from 'react';
import { createEmployee, updateEmployee } from '../services/api';

export default function EmployeeForm({ employee, onClose, refresh }) {
  const [formData, setFormData] = useState(employee || {
    name: '', email: '', phone: '', role: '', department: 'IT', salary: '', joiningDate: '', status: 'Active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        await updateEmployee(employee._id, formData);
      } else {
        await createEmployee(formData);
      }
      refresh();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{employee ? 'Edit Employee Details' : 'Add New Employee'}</h3>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <input 
            required 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          
          <input 
            required 
            type="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />

          <div className="modal-row">
            <input 
              required 
              placeholder="Phone" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
            <input 
              required 
              placeholder="Role (e.g. Developer)" 
              value={formData.role} 
              onChange={(e) => setFormData({...formData, role: e.target.value})} 
            />
          </div>

          <div className="modal-row">
            <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>

            <input 
              required 
              type="number" 
              placeholder="Salary" 
              value={formData.salary} 
              onChange={(e) => setFormData({...formData, salary: e.target.value})} 
            />
          </div>

          <div className="modal-row">
            <input 
              required 
              type="date" 
              value={formData.joiningDate ? formData.joiningDate.substring(0,10) : ''} 
              onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} 
            />
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-add" style={{ flex: 1, justifyContent: 'center' }}>
              Save Employee
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}