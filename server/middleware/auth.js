const jwt = require('jsonwebtoken')

const User = require('../models/User')
const connectDb = require('../../utils/connectDb')

connectDb()

module.exports = async (req, res, next) => {
	if (!('authorization' in req.headers)) {
		return res.status(401).send('No authorization token.')
	}
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		)
		const user = await User.findById(userId)
		if (user) {
			req.user = user
			next()
		} else {
			res.status(404).send('User not found.')
		}
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
}
