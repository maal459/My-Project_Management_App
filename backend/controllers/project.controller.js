const Project = require('../models/project.model');

// Get all projects
exports.findAll = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new project
exports.create = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const project = await Project.create({ name, description, status });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.update({ name, description, status });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(4000).json({ error: error.message });
  }
};
