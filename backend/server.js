const express = require('express');
const cors = require('cors'); // Import CORS
const sequelize = require('./config/db.config'); // Import Sequelize instance
const Project = require('./models/project.model'); // Import your model

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Sync the database
sequelize
  .sync() // Use `sync({ force: true })` only during development to reset tables
  .then(() => console.log('Database connected and synced!'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll(); // Fetch all projects
    res.json(projects); // Send as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const newProject = await Project.create({ name, description, status }); // Create a project
    res.status(201).json(newProject); // Send the created project
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const project = await Project.findByPk(id); // Find project by ID
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.update({ name, description, status }); // Update the project
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id); // Find project by ID
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.destroy(); // Delete the project
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
