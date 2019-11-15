const express = require('express')

const Product = require('../../models/Product')
const Order = require('../../models/Order')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')

connectDb()

const router = express.Router()

router.get('/orders', auth, async (req, res) => {
	try {
		const { page, size } = req.query
		const pageNumber = Number(page)
		const pageSize = Number(size)
		const totalDocs = await Order.countDocuments({ user: req.user._id })
		const totalPages = Math.ceil(totalDocs / pageSize)
		let orders = []
		if (pageNumber === 1) {
			orders = await Order.find({ user: req.user._id })
				.limit(pageSize)
				.sort({ createdAt: 'desc' })
				.populate({
					path: 'products.product',
					model: 'Product'
				})
		} else {
			const skips = pageSize * (pageNumber - 1)
			orders = await Order.find({ user: req.user._id })
				.skip(skips)
				.limit(pageSize)
				.sort({ createdAt: 'desc' })
				.populate({
					path: 'products.product',
					model: 'Product'
				})
		}
		res.status(200).json({ orders, totalPages })
	} catch (error) {
		console.error(error)
		res.status(403).send('Please log in again.')
	}
})

module.exports = router
