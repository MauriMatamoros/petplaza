const mongoose = require('mongoose')

const { ObjectId, String, Number } = mongoose.Schema.Types

const BookingSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User'
		},
		pet: {
			type: ObjectId,
			ref: 'Pet'
		},
		doctor: {
			type: ObjectId,
			ref: 'User'
		},
		date: {
			type: Date,
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: ['grooming', 'medical', 'hotel']
		},
		observations: {
			type: String
		}
	},
	{
		timestamps: true
	}
)

module.exports =
	mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
