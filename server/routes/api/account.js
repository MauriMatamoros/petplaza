const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../../models/User')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')

connectDb()

const router = express.Router()

router.get('/account', auth, async (req, res) => {
	try {
		if (req.user) {
			res.status(200).json(req.user)
		} else {
			res.status(404).send('User not found.')
		}
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
})

router.put('/account', auth, async (req, res) => {
	try {
		const { name, email, id, birthday } = req.body
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ name, email, id, birthday },
			{ new: true }
		)
		res.status(201).json(user)
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
})

router.put('/account/doctor', auth, async (req, res) => {
	try {
		const {
			university,
			specialty,
			facebook,
			twitter,
			instagram,
			youtube
		} = req.body
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ university, specialty, facebook, twitter, instagram, youtube },
			{ new: true }
		)
		res.status(201).json(user)
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
})

router.put('/account/changePassword', auth, async (req, res) => {
	try {
		const { newPassword, currentPassword } = req.body
		const user = await User.findById(req.user._id).select('+password')
		const passwordsMatch = await bcrypt.compare(currentPassword, user.password)
		if (passwordsMatch) {
			const hash = await bcrypt.hash(newPassword, 10)
			const user = await User.findOneAndUpdate(
				{ _id: req.user._id },
				{ password: hash },
				{ new: true }
			)
			res.status(201).send('Password Updated.')
		} else {
			res.status(401).send('Passwords do not match.')
		}
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
})

module.exports = router
