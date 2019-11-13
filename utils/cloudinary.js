const cloudinary = require('cloudinary').v2

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

const deleteImage = (mediaUrl) =>
	new Promise((resolve, reject) => {
		const id = mediaUrl
			.split('/')
			.pop()
			.split('.')[0]
		cloudinary.uploader.destroy(id, (error, result) => {
			if (error) return reject(error)
			return resolve(result)
		})
	})

module.exports = {
	deleteImage
}
