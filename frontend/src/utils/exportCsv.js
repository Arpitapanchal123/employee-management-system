export const exportToCSV = (data, filename = 'employee_data.csv') => {
  if (!data || data.length === 0) return alert('No data available to export');

  const headers = ['Name', 'Email', 'Phone', 'Role', 'Department', 'Salary', 'Joining Date', 'Status'];
  const rows = data.map(emp => [
    `"${emp.name}"`,
    `"${emp.email}"`,
    `"${emp.phone}"`,
    `"${emp.role}"`,
    `"${emp.department}"`,
    emp.salary,
    `"${new Date(emp.joiningDate).toLocaleDateString()}"`,
    `"${emp.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};