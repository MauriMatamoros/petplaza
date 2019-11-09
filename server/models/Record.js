const mongoose = require('mongoose')

const { ObjectId, String } = mongoose.Schema.Types

const RecordSchema = new mongoose.Schema(
	{
		pet: {
			type: ObjectId,
			ref: 'Pet'
		},
		vaccines: [
			{
				name: {
					type: String,
					required: true
				},
				date: {
					type: String,
					required: true
				}
			}
		],
		alergies: [
			{
				name: {
					type: String,
					required: true
				}
			}
		],
		diseases: [
			{
				name: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
)

module.exports =
	mongoose.models.Record || mongoose.model('Record', RecordSchema)
