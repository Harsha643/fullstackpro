const Events=require("../Models/Events");

exports.getAllEvents=async(req,res)=>{
    try{
        const events=await Events.find();
        res.status(200).json(events);
    }catch(error){
        console.error("Error fetching events:", error);
        res.status(500).json({message:"Error fetching events",error});
    }
}
exports.getEventById=async(req,res)=>{
    const { id } = req.params;
    try {
        const event=await Events.findById(id)
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({message: "Error fetching Events " + error.message})
    }
}

exports.createEvent=async(req,res)=>{
    
    console.log(req.body)
    // console.log(`Request body: ${JSON.stringify(req.body)}`);
    try{
        const newEvent=await Events.create(req.body);
        res.status(201).json({message:"Event created successfully",newEvent});
    }catch(error){
        res.status(500).json({message:"Error creating event",error});
    }
}
exports.updateEvent=async(req,res)=>{
    const { id } = req.params;
    try {
        const updated = await Events.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(updated);
    }catch(error){
        res.status(500).json({message:"Error updating event",error});
    }
}
exports.deleteEvent=async(req,res)=>{
    const { id } = req.params;
    try {
        const deleted = await Events.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
}

