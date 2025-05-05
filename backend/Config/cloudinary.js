

const cloudinary = require('cloudinary').v2
const dotenv= require('dotenv')
 // Load environment variables from config.env file
dotenv.config()
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUNDINARY_NAME,
        api_key: process.env.CLOUNDINARY_API_KEY,
        api_secret: process.env.CLOUNDINARY_SECRET_KEY
    })
}
module.exports = connectCloudinary