const express = require('express')
const bcrypt = require('bcrypt')
const uuid = require('uuid/v1')
const sgMail = require('@sendgrid/mail')

const User = require('../../models/User')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')
const cloudinary = require('../../../utils/cloudinary')
const baseUrl = require('../../../utils/baseUrl')

connectDb()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
			await User.findOneAndUpdate(
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

router.put('/account/profilePicture', auth, async (req, res) => {
	try {
		const { profilePicture } = req.body
		const user = await User.findById(req.user._id)
		if (!user.profilePicture) {
			const user = await User.findOneAndUpdate(
				{ _id: req.user._id },
				{ profilePicture },
				{ new: true }
			)
			return res.send(201).send(user.profilePicture)
		}
		console.log(user.profilePicture.split('/'))
	} catch (error) {
		res
			.status(500)
			.send('Server error. Please try setting your profile picture later.')
	}
})

router.post('/account/recoverPassword', async (req, res) => {
	try {
		const { email } = req.body
		if (!email) {
			return res.status(404).send('No email was recieved.')
		}
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).send('Email did not match one in our archives.')
		}
		const resetToken = uuid()
		await User.findOneAndUpdate({ email }, { resetToken })
		const msg = {
			to: user.email,
			from: 'petplaza@example.com',
			subject: 'Password Reset',
			text: 'Click the link below to reset your password',
			html: `<a href='${baseUrl}/resetPassword/${resetToken}'>Reset Password</a>`
		}
		await sgMail.send(msg)
		res.status(200).send('Email sent.')
	} catch (error) {
		res
			.status(500)
			.send('Server error. Please try reseting your password later.')
	}
})

router.post('/account/resetPassword', async (req, res) => {
	try {
		const { resetToken, newPassword } = req.body
		const user = await User.findOne({ resetToken })
		if (!user) {
			return res.status(401).send('Not a valid token.')
		}
		const hash = await bcrypt.hash(newPassword, 10)
		await User.findOneAndUpdate(
			{ resetToken },
			{ resetToken: null, password: hash }
		)
		res.send(200).send('Password reset was successful.')
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.send('Server error. Please try reseting your password later.')
	}
})

module.exports = router
