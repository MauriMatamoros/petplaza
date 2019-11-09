const express = require('express')

const Product = require('../../models/Product')
const Order = require('../../models/Order')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')

connectDb()

const router = express.Router()

router.get('/orders', auth, async (req, res) => {
	try {
		// sorting order history by dates
		const orders = await Order.find({ user: req.user._id })
			.sort({ createdAt: 'desc' })
			.populate({
				path: 'products.product',
				model: 'Product'
			})
		res.status(200).json(orders)
	} catch (error) {
		console.error(error)
		res.status(403).send('Please log in again.')
	}
})

module.exports = router
