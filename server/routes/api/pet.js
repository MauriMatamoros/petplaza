const express = require('express')
const mongoose = require('mongoose')

const Pet = require('../../models/Pet')
const User = require('../../models/User')
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
		await new Record({ pet: pet._id }).save()
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

router.get('/patients/:id', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isNeitherRootOrDoctor = !isRoot && !isDoctor
		if (isNeitherRootOrDoctor) {
			return res.status(401).send('Not enough privilages.')
		}
		const user = await User.findOne({ id: req.params.id }).select(
			'+name +cellphone +email +profilePicture'
		)
		if (!user) {
			return res.status(404).send('User not found.')
		}
		const pets = await Pet.find({ owner: user._id })
		res.status(200).json({ user, pets })
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.get('/pet/:_id', async (req, res) => {
	try {
		const pet = await Pet.findById(req.params._id)
		const record = await Record.findOne({ pet: pet._id })
		res.status(201).json({ pet, record })
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.put('/add/vaccine/:id', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		const { name, date } = req.body
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		const record = await Record.findOneAndUpdate(
			{ pet: req.params.id },
			{ $push: { vaccines: { name, date } } },
			{ new: true }
		)
		res.status(201).json(record.vaccines[record.vaccines.length - 1])
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.put('/add/allergy/:id', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		const { allergy } = req.body
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		const record = await Record.findOneAndUpdate(
			{ pet: req.params.id },
			{ $push: { allergies: { name: allergy } } },
			{ new: true }
		)
		res.status(201).json(record.allergies[record.allergies.length - 1])
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.put('/add/disease/:id', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		const { disease } = req.body
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		const record = await Record.findOneAndUpdate(
			{ pet: req.params.id },
			{ $push: { diseases: { name: disease } } },
			{ new: true }
		)
		res.status(201).json(record.diseases[record.diseases.length - 1])
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.delete('/pet/:petId/disease/:diseaseId', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		await Record.findOneAndUpdate(
			{ pet: req.params.petId },
			{ $pull: { diseases: { _id: req.params.diseaseId } } }
		)
		res.status(201).json(req.params.diseaseId)
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.delete('/pet/:petId/allergy/:allergyId', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		await Record.findOneAndUpdate(
			{ pet: req.params.petId },
			{ $pull: { allergies: { _id: req.params.allergyId } } }
		)
		res.status(201).json(req.params.allergyId)
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

router.delete('/pet/:petId/vaccine/:vaccineId', auth, async (req, res) => {
	try {
		const isRoot = req.user.role === 'root'
		const isDoctor = req.user.role === 'doctor'
		const isDoctorOrRoot = isRoot || isDoctor
		if (!isDoctorOrRoot) {
			return res.send(401).send('Not enough permissions.')
		}
		await Record.findOneAndUpdate(
			{ pet: req.params.petId },
			{ $pull: { vaccines: { _id: req.params.vaccineId } } }
		)
		res.status(201).json(req.params.vaccineId)
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
