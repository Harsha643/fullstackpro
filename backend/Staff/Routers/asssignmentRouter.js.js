const express = require('express');

const assignmentRouters= express.Router();
const assignmentController = require('../Controllers/assignmentController'); 
assignmentRouters.get('/', assignmentController.getAssignments);
assignmentRouters.post('/', assignmentController.createAssignment);
assignmentRouters.put('/:id', assignmentController.updateAssignment);
assignmentRouters.delete('/:id', assignmentController.deleteAssignment);


module.exports = assignmentRouters;