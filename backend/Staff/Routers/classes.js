
const express=require("express")

const classRouters=express.Router()

const classController=require("../Controllers/classes")


classRouters.get("/",classController.getAllClasses)
classRouters.post("/",classController.createClass)
classRouters.put("/:id",classController.updateClass)
classRouters.delete("/:id",classController.deleteClass)

module.exports=classRouters

