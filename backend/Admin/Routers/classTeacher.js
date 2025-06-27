const express = require("express");
const ClassTeacherRoutes=express.Router();
const ClassTeacherController=require("../Controllers/classTeacher")


ClassTeacherRoutes.get("/",ClassTeacherController.getAllClassTeacher)
ClassTeacherRoutes.get("/:teacherName",ClassTeacherController.getClassTeacherByTeacherName)
ClassTeacherRoutes.post("/",ClassTeacherController.createClassTeacher)
ClassTeacherRoutes.put("/:classNumber",ClassTeacherController.updateClassTeacher)
ClassTeacherRoutes.delete("/:classNumber",ClassTeacherController.deleteClassTeacher)

module.exports=ClassTeacherRoutes;