const mongoose = require('mongoose')

const { String, Number } = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	price: {
		required: true,
		type: Number
	},
	description: {
		type: String,
		required: true
	},
	mediaUrl: {
		type: String,
		required: true
	},
	inStock: {
		type: Number,
		required: true
	}
})

module.exports =
	mongoose.models.Product || mongoose.model('Product', ProductSchema)
