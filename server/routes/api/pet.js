const express = require('express')

const Pet = require('../../models/Pet')
const Record = require('../../models/Record')
const CheckUp = require('../../models/CheckUp')
const auth = require('../../middleware/auth')

const connectDb = require('../../../utils/connectDb')

connectDb()

const router = express.Router()

router.post('/pet', auth, async (req, res) => {
	try {
		const { name, breed, color, profilePicture, gender, birthday } = req.body
		if (!name || !breed || !color || !profilePicture || !gender || !birthday) {
			return res.status(422).send('Product missing one or more fields')
		}
		if (!(req.user.role === 'user')) {
			return res.status(401).send('Not enough privilages')
		}
		const pet = await new Pet({
			name,
			breed,
			color,
			profilePicture,
			gender,
			birthday
		}).save()
		res.status(201).json({ pet })
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

module.exports = router
