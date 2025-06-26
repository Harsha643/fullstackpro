const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/', assignmentController.getAssignments);
router.get('/:classNumber', assignmentController.getAssigmentByClass);
router.post('/', assignmentController.createAssignment);
router.put('/:id', assignmentController.updateAssignment);
// router.delete('/assignments/:id', assignmentController.deleteAssignment);

module.exports = router;
