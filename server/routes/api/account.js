const express = require('express')

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

module.exports = router
