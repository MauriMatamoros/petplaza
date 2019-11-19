const mongoose = require('mongoose')

const { ObjectId, String } = mongoose.Schema.Types

const CheckUpSchema = new mongoose.Schema(
	{
		pet: {
			type: ObjectId,
			ref: 'Pet'
		},
		diagnostic: {
			type: String,
			required: true
		},
		observations: {
			type: String
		},
		medicines: {
			type: String
		},
		tests: [
			{
				type: String
			}
		]
	},
	{
		timestamps: true
	}
)

module.exports =
	mongoose.models.CheckUp || mongoose.model('CheckUp', CheckUpSchema)
