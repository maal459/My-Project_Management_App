import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

function App() {
  // State to store the list of projects
  const [projects, setProjects] = useState([]);

  // Function to fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      // Making a GET request to fetch project data from the API
      const { data } = await axios.get('http://127.0.0.1:8000/api/projects');
      setProjects(data); // Updating the `projects` state with fetched data
    } catch (error) {
      console.error('Error fetching projects:', error.message); // Logging errors in case of failure
    }
  };

  // React's useEffect to fetch projects when the component is mounted
  useEffect(() => {
    fetchProjects(); // Fetch projects on initial load
  }, []);

  // Function to handle the creation of a new project
  const handleCreate = async (project) => {
    try {
      // Sending a POST request to create a new project
      await axios.post('http://127.0.0.1:8000/api/projects', project);
      fetchProjects(); // Refresh the project list after creation
    } catch (error) {
      console.error('Error creating project:', error.message); // Log any errors
    }
  };

  // Function to handle updating an existing project
  const handleUpdate = async (id, updatedProject) => {
    try {
      // Sending a PUT request to update a specific project by ID
      await axios.put(`http://127.0.0.1:8000/api/projects/${id}`, updatedProject);
      fetchProjects(); // Refresh the project list after update
    } catch (error) {
      console.error('Error updating project:', error.message); // Log any errors
    }
  };

  // Function to handle deleting a project
  const handleDelete = async (id) => {
    try {
      // Sending a DELETE request to remove a specific project by ID
      await axios.delete(`http://127.0.0.1:8000/api/projects/${id}`);
      fetchProjects(); // Refresh the project list after deletion
    } catch (error) {
      console.error('Error deleting project:', error.message); // Log any errors
    }
  };

  return (
    <div>
      {/* Embedded CSS for styling the app */}
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #121212; /* Dark theme background */
          color: #fff; /* Light text for dark theme */
        }

        .main-container {
          display: flex;
          justify-content: space-between;
          padding: 40px;
          gap: 30px;
        }

        .create-form {
          flex: 1;
          max-width: 350px;
          background-color: #1e1e2f; /* Form background */
          color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add subtle shadow */
        }

        .create-form h3 {
          color: #fdd835; /* Yellow color for title */
          text-align: center;
          margin-bottom: 20px;
        }

        .create-form input,
        .create-form textarea,
        .create-form select {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #2e2e3d; /* Input field background */
          color: #fff; /* Input text color */
        }

        .create-form button {
          width: 100%;
          background-color: #fdd835; /* Yellow background for buttons */
          border: none;
          padding: 10px;
          color: #121212; /* Dark text on yellow */
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }

        .create-form button:hover {
          background-color: #ffeb3b; /* Lighter yellow on hover */
        }

        .project-list {
          flex: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: flex-start;
        }

        .project-card {
          background-color: #fdd835; /* Yellow background for cards */
          color: #121212; /* Dark text on yellow */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow */
          padding: 20px;
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .project-card h3 {
          color: #121212; /* Dark title color */
          margin-bottom: 10px;
        }

        .project-card p {
          margin: 5px 0;
          color: #212121; /* Slightly lighter text for details */
        }

        .project-card .actions {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
        }

        .project-card button {
          border: none;
          padding: 10px 15px;
          color: #121212; /* Dark text on yellow */
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }

        .project-card button.update {
          background-color: #fdd835; /* Yellow */
        }

        .project-card button.update:hover {
          background-color: #fff; /* Lighter yellow */
        }

        .project-card button.delete {
          background-color: #d32f2f; /* Red button for delete */
        }

        .project-card button.delete:hover {
          background-color: #f44336; /* Lighter red on hover */
        }

        @media (max-width: 768px) {
          .main-container {
            flex-direction: column; /* Stack items vertically on smaller screens */
            align-items: center;
          }

          .project-list {
            justify-content: center; /* Center cards on smaller screens */
          }
        }
      `}</style>

      {/* Page Header */}
      <h1 style={{ textAlign: 'center', color: '#fdd835', margin: '20px 0' }}>
        Project Management
      </h1>

      <div className="main-container">
        {/* Create Project Form */}
        <div className="create-form">
          <h3>Create Project</h3>
          <ProjectForm onCreate={handleCreate} />
        </div>

        {/* Project List */}
        <div className="project-list">
          <ProjectList projects={projects} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
