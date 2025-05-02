const express=require("express");
const EventsRouter=express.Router();
const EventsController=require("../Controllers/Events");

EventsRouter.get("/",EventsController.getAllEvents);
EventsRouter.get("/:id",EventsController.getEventById);
EventsRouter.post("/",EventsController.createEvent);
EventsRouter.put("/:id",EventsController.updateEvent);
EventsRouter.delete("/:id",EventsController.deleteEvent);

module.exports=EventsRouter;