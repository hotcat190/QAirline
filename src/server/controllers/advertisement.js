import { Advertisement } from "../models/models.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadAdvertisement = async (req, res) => {
    try {
        // Upload an image
        const byteArrayBuffer = req.body;
        new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream(
                (error, uploadResult) => {
                if (error) {
                    res.status(500).send({ error: 'Failed to upload image' });
                }
                return resolve(uploadResult);
            }).end(byteArrayBuffer);
        }).then((uploadResult) => {
            res.send({
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id, 
            })
        });
    
        console.log(uploadResult);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}