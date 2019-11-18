const express = require('express')

const Pet = require('../../models/Pet')
const Record = require('../../models/Record')
const CheckUp = require('../../models/CheckUp')
const auth = require('../../middleware/auth')

const connectDb = require('../../../utils/connectDb')
const { deleteImage } = require('../../../utils/cloudinary')

connectDb()

const router = express.Router()

router.post('/pet', auth, async (req, res) => {
	try {
		const { name, breed, color, gender, birthday } = req.body
		if (!name || !breed || !color || !gender || !birthday) {
			return res.status(422).send('Pet missing one or more fields')
		}
		const owner = req.user._id
		const pet = await new Pet({
			name,
			breed,
			color,
			gender,
			birthday,
			owner
		}).save()
		res.status(201).json({ pet })
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.get('/pets', auth, async (req, res) => {
	try {
		const pets = await Pet.find({ owner: req.user._id })
		res.status(201).json(pets)
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.get('/pet/:_id', async (req, res) => {
	try {
		const pet = await Pet.findById(req.params._id)
		res.status(201).json(pet)
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.put('/pet/:_id', auth, async (req, res) => {
	try {
		const { name, breed, color, gender, birthday } = req.body
		const pet = await Pet.findOneAndUpdate(
			{ _id: req.params._id, owner: req.user._id },
			{ name, breed, color, gender, birthday },
			{ new: true }
		)
		res.status(201).json(pet)
	} catch (error) {
		res.status(403).send('Invalid token.')
	}
})

router.put('/pet/profilePicture/:_id', auth, async (req, res) => {
	try {
		const { profilePicture } = req.body
		let pet = await Pet.find({ owner: req.user._id, _id: req.params._id })
		if (pet.profilePicture) {
			await deleteImage(pet.profilePicture)
		}
		pet = await Pet.findOneAndUpdate(
			{ _id: req.params._id, owner: req.user._id },
			{ profilePicture },
			{ new: true }
		)
		res.status(201).send(pet.profilePicture)
	} catch (error) {
		res
			.status(500)
			.send('Server error. Please try setting your profile picture later.')
	}
})

module.exports = router
