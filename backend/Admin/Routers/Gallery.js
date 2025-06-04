const express = require("express")
const GalleryRouter = express.Router()
const multer = require('multer')
const galleryController = require("../Controllers/Gallery")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.originalname.split('.').pop()
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({ storage })

GalleryRouter.get("/", galleryController.getAllImages)
GalleryRouter.post("/", upload.single("image"), galleryController.uploadImage)
GalleryRouter.get("/:id", galleryController.getImageById)
GalleryRouter.put("/:id", galleryController.updateImage)
GalleryRouter.delete("/:id", galleryController.deleteImage)

module.exports = GalleryRouter