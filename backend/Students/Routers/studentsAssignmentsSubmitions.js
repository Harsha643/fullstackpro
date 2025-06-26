const express = require('express');
const submissionRouter = express.Router();
const submissionController = require('../Controllers/studentAssignmentController'); // fixed casing


submissionRouter.get('/', submissionController.getSubmissions);
submissionRouter.post('/', submissionController.createSubmission);
submissionRouter.put('/:id', submissionController.updateSubmission);
submissionRouter.delete('/:id', submissionController.deleteSubmission);


module.exports = submissionRouter;