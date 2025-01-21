import React, { useState } from 'react';

function ProjectList({ projects, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null); // Track which project is being edited
  const [editableProject, setEditableProject] = useState({}); // Store editable project data

  // Handle the edit button click
  const handleEditClick = (project) => {
    setEditingId(project.id); // Set the project ID being edited
    setEditableProject({ ...project }); // Copy the project data into state
  };

  // Handle input field changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProject((prev) => ({ ...prev, [name]: value })); // Update the specific field
  };

  // Handle saving the edited project
  const handleSaveClick = () => {
    onUpdate(editingId, editableProject); // Trigger update function
    setEditingId(null); // Exit editing mode
  };

  // Handle canceling edit mode
  const handleCancelClick = () => {
    setEditingId(null); // Exit editing mode
    setEditableProject({}); // Reset editable project data
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#4caf50', textAlign: 'center' }}>All Projects</h2>

      {/* Projects Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: '#1e1e2f',
              color: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              padding: '20px',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {editingId === project.id ? (
              // Editable form fields
              <div>
                <input
                  type="text"
                  name="name"
                  value={editableProject.name}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#2e2e3d',
                    color: '#fff',
                  }}
                />
                <textarea
                  name="description"
                  value={editableProject.description}
                  onChange={handleInputChange}
                  placeholder="Project Description"
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#2e2e3d',
                    color: '#fff',
                  }}
                ></textarea>
                <select
                  name="status"
                  value={editableProject.status}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#2e2e3d',
                    color: '#fff',
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ) : (
              // Display project details
              <div>
                <h3 style={{ color: '#4caf50', margin: '10px 0' }}>{project.name}</h3>
                <p>{project.description}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong> {new Date(project.updated_at).toLocaleString()}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              {editingId === project.id ? (
                <>
                  <button
                    onClick={handleSaveClick}
                    style={{
                      backgroundColor: '#4caf50',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    style={{
                      backgroundColor: '#f44336',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(project)}
                    style={{
                      backgroundColor: '#4caf50',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    style={{
                      backgroundColor: '#f44336',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
