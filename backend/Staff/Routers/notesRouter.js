const express = require("express");
const notesRouter = express.Router();
const notescontroller = require("../Controllers/notesController"); // fixed casing

notesRouter.get("/", notescontroller.getNotes);
notesRouter.get("/:classNumber", notescontroller.getNotesByClasses);
notesRouter.post("/", notescontroller.createNote);
notesRouter.put("/:id", notescontroller.updateNote);
notesRouter.delete("/:id", notescontroller.deleteNote);

module.exports = notesRouter;
