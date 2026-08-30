const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

// Performance Optimization: Indexes for Fast Search & Sorting
employeeSchema.index({ createdAt: -1 });
employeeSchema.index({ name: 1, email: 1 });
employeeSchema.index({ department: 1, status: 1 });

module.exports = mongoose.model('Employee', employeeSchema);