import React, { useState } from 'react';

function ProjectForm({ onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Project name is required.';
    }
    if (!['active', 'inactive', 'completed'].includes(status)) {
      newErrors.status = 'Invalid status selected.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onCreate({ name, description, status });
    setName('');
    setDescription('');
    setStatus('active');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.container}>
      <h3 style={formStyles.title}>Create Project</h3>

      {/* Project Name Field */}
      <div style={formStyles.fieldContainer}>
        <label style={formStyles.label}>Project Name</label>
        <input
          type="text"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={formStyles.input}
        />
        {errors.name && <p style={formStyles.error}>{errors.name}</p>}
      </div>

      {/* Description Field */}
      <div style={formStyles.fieldContainer}>
        <label style={formStyles.label}>Description</label>
        <textarea
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={formStyles.textarea}
        ></textarea>
      </div>

      {/* Status Dropdown */}
      <div style={formStyles.fieldContainer}>
        <label style={formStyles.label}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={formStyles.select}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" style={formStyles.button}>
        Create Project
      </button>
    </form>
  );
}

const formStyles = {
  container: {
    backgroundColor: '#1e1e2f',
    padding: '20px 25px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    maxWidth: '350px',
    margin: '0 auto',
  },
  title: {
    color: '#fdd835',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#fdd835',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#2e2e3d',
    color: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#2e2e3d',
    color: '#fff',
    height: '80px',
    resize: 'none',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#2e2e3d',
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fdd835',
    color: '#121212',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default ProjectForm;
