const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isEmail = require('validator/lib/isEmail')
const isLength = require('validator/lib/isLength')

const connectDb = require('../../../utils/connectDb')
const User = require('../../models/User')
const Cart = require('../../models/Cart')

connectDb()

const router = express.Router()

router.post('/signup', async (req, res) => {
	try {
		const { name, email, password, id, birthday } = req.body
		if (!isLength(name, { min: 3, max: 10 })) {
			return res.status(422).send('Name must be 3-10 characters long.')
		} else if (!isLength(password, { min: 6 })) {
			return res
				.status(422)
				.send('Password must be at least 6 characters long.')
		} else if (!isEmail(email)) {
			return res.status(422).send('Email must be valid')
		} else if (!isLength(id, { min: 13, max: 13 })) {
			return res.status(422).send('Invalid ID')
		}
		let user = await User.findOne({ email })
		if (user) {
			return res.status(422).send(`User already exists with email ${email}`)
		}
		const hash = await bcrypt.hash(password, 10)
		user = await new User({ name, email, password: hash, id, birthday }).save()
		await new Cart({ user: user._id }).save()
		const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d'
		})
		res.status(201).json(token)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error signing up user. Please try again later.')
	}
})

module.exports = router
