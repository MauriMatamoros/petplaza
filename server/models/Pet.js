const mongoose = require('mongoose')

const { ObjectId, String } = mongoose.Schema.Types

const PetSchema = new mongoose.Schema({
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	birthday: {
		required: true,
		type: String
	},
	color: {
		required: true,
		type: String
	},
	profilePicture: {
		type: String
	},
	breed: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: true
	}
})

module.exports = mongoose.models.Pet || mongoose.model('Pet', PetSchema)
