const mongoose = require('mongoose')

const { String, Date } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String
		},
		email: {
			required: true,
			unique: true,
			type: String
		},
		password: {
			required: true,
			type: String,
			select: false
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: ['admin', 'user', 'root', 'doctor']
		},
		id: {
			type: String,
			unique: true,
			required: true
		},
		birthday: {
			type: Date,
			required: true
		},
		profilePicture: {
			type: String
		},
		university: {
			type: String
		},
		specialty: {
			type: String
		},
		facebook: {
			type: String
		},
		twitter: {
			type: String
		},
		instagram: {
			type: String
		},
		youtube: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
