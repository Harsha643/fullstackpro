const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: [true, "imageName is required"]
    },
    image: {
        type: String,
        default: null
    }
}, {timestamps: true})

const Image = mongoose.model("Image", imageSchema)
module.exports = Image