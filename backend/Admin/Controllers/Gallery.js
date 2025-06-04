const Image = require("../Models/Gallery")
const cloudinary = require("cloudinary").v2
const fs = require('fs')

exports.getAllImages = async (req, res) => {
    console.log("Fetching all images")
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
        // Find the existing image first
        const existingImage = await Image.findById(id)
        if (!existingImage) {
            return res.status(404).json({message: "Image not found"})
        }

        let updateData = {
            imageName: req.body.imageName || existingImage.imageName,
            image: existingImage.image // Keep existing image by default
        }

        // If a new image file was uploaded
        if (req.file) {
            // First delete the old image from Cloudinary if it exists
            if (existingImage.image) {
                const publicId = existingImage.image.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(`gallery/${publicId}`)
            }

            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "gallery"
            })
            
            // Update with new image URL
            updateData.image = result.secure_url
            
            // Remove the temporary file
            fs.unlinkSync(req.file.path)
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            updateData,
            {new: true, runValidators: true}
        )

        res.status(200).json({
            message: "Image updated successfully",
            image: updatedImage
        })
    } catch (error) {
        // Clean up if error occurs
        if (req.file) fs.unlinkSync(req.file.path)
        res.status(500).json({
            message: "Error updating Image",
            error: error.message
        })
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