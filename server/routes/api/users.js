const express = require('express')

const User = require('../../models/User')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')

connectDb()

const router = express.Router()

router.put('/users/:_id', auth, async (req, res) => {
	try {
		if (req.user.role !== 'root') {
			return res.status(401).send('Not enough privilages')
		}
		const { _id } = req.params
		const { role } = req.body
		await User.findByIdAndUpdate({ _id }, { role })
		res.status(203).send('User updated.')
	} catch (error) {
		console.error(error)
		res.status(403).send('Please log in again.')
	}
})

router.get('/users', auth, async (req, res) => {
	try {
		if (req.user.role !== 'root') {
			return res.status(401).send('Not enough privilages')
		}
		// sort by role
		const users = await User.find({ _id: { $ne: req.user._id } }).sort({
			role: 'asc'
		})
		res.status(200).json(users)
	} catch (error) {
		console.log('dist')
		console.error(error)
		res.status(403).send('Please log in again.')
	}
})

module.exports = router
