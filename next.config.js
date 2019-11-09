// must restart server whenever you make changes in next.config
module.exports = {
	env: {
		MONGO_SRV:
			'mongodb+srv://administrator:JMYrhKMppc7MNbGW@store-beta-aqgf6.mongodb.net/test?retryWrites=true&w=majority',
		JWT_SECRET: 'FnoDFonFlnads',
		CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/mmatamoros/image/upload',
		CLOUDINARY_NAME: 'mmatamoros',
		CLOUDINARY_API_KEY: '482665696116964',
		CLOUDINARY_API_SECRET: 'SxpGK2aAEQUGwp0u1XR267r9Tew',
		STRIPE_SECRET_KEY: 'sk_test_7Pcv8oEESNTCNoZ69xYYc0qB00rVlAHKjX'
	}
}
