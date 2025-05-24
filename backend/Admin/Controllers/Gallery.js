const Image = require("../Models/Gallery")
const cloudinary = require("cloudinary").v2
const fs = require('fs')

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find()
        res.status(200).json(images)
    } catch (error) {
        res.status(500).json({message: "Error fetching images", error})
    }
}

exports.getImageById = async (req, res) => {
    const {id} = req.params
    try {
        const image = await Image.findById(id)
        if (!image) {
            return res.status(404).json({message: "Image not found"})
        }
        res.status(200).json(image)
    } catch (error) {
        res.status(500).json({message: "Error fetching image", error})
    }
}

exports.uploadImage = async (req, res) => {
    try {
        const { imageName } = req.body
        
        if (!req.file) {
            return res.status(400).json({message: "No file uploaded"})
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "gallery"
        })

        // Remove file from local storage
        fs.unlinkSync(req.file.path)

        const newImage = new Image({
            imageName,
            image: result.secure_url
        })

        const savedImage = await newImage.save()
        res.status(201).json({message: "Image added successfully", image: savedImage})
    } catch (error) {
        // Clean up if error occurs
        if (req.file) fs.unlinkSync(req.file.path)
        res.status(500).json({message: "Error creating Image", error: error.message})
    }
}

exports.updateImage = async (req, res) => {
    const {id} = req.params
    try {
        const updateImage = await Image.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        )
        if (!updateImage) {
            return res.status(404).json({message: "Image not found"})
        }
        res.status(200).json(updateImage)
    } catch (error) {
        res.status(500).json({message: "Error updating Image", error})
    }
}

exports.deleteImage = async (req, res) => {
    const {id} = req.params
    try {
        const deleteImage = await Image.findByIdAndDelete(id)
        if (!deleteImage) {
            return res.status(404).json({message: "Image not found"})
        }
        res.status(200).json({message: "Image deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Error deleting Image: " + error.message})
    }
}