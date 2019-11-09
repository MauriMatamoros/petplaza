const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const connectDb = require('../../../utils/connectDb')
const User = require('../../models/User')

connectDb()

const router = express.Router()

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		let user = await User.findOne({ email }).select('+password')
		if (!user) {
			return res.status(404).send(`User with email ${email} not found.`)
		}
		const passwordsMatch = await bcrypt.compare(password, user.password)
		if (passwordsMatch) {
			const token = await jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET,
				{
					expiresIn: '1d'
				}
			)
			res.status(201).json(token)
		} else {
			res.status(401).send('Passwords do not match.')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Error signing up user. Please try again later.')
	}
})

module.exports = router
