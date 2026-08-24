import React from 'react';
import { X, Mail, Phone, Calendar, DollarSign, Briefcase, Building } from 'lucide-react';

export default function EmployeeViewModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Employee Profile</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
          <div className="avatar" style={{ width: '56px', height: '56px', fontSize: '1.5rem', margin: '0 auto 10px' }}>
            {employee.name.charAt(0)}
          </div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{employee.name}</h4>
          <span className={`status-tag ${employee.status === 'Active' ? 'active' : 'inactive'}`}>
            {employee.status}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16} color="var(--text-muted)" /> {employee.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} color="var(--text-muted)" /> {employee.phone}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Briefcase size={16} color="var(--text-muted)" /> {employee.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Building size={16} color="var(--text-muted)" /> {employee.department}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><DollarSign size={16} color="var(--text-muted)" /> ₹{Number(employee.salary).toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Calendar size={16} color="var(--text-muted)" /> Joined: {new Date(employee.joiningDate).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}