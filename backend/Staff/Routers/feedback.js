const express=require("express")
const feedbackRouters=express.Router()
const feedbackController=require("../Controllers/feedback")

feedbackRouters.get("/",feedbackController.getAllFeedbacks)
feedbackRouters.get("/subject/:subject",feedbackController.getFeedbackBysubject)
feedbackRouters.post("/",feedbackController.createFeedback)
feedbackRouters.put("/:id",feedbackController.updateFeedback)
feedbackRouters.delete("/:id",feedbackController.deleteFeedback)

module.exports=feedbackRouters
