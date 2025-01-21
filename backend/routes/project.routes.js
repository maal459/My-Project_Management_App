const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/projects', projectController.findAll);
router.post('/projects', projectController.create);
router.put('/projects/:id', projectController.update);
router.delete('/projects/:id', projectController.delete);

module.exports = router;
