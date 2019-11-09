const express = require('express')
const connectDB = require('../../../utils/connectDb')
const Product = require('../../models/Product')

connectDB()

const router = express.Router()

router.get('/products', async (req, res) => {
	const { page, size } = req.query
	const pageNumber = Number(page)
	const pageSize = Number(size)
	let products = []
	const totalDocs = await Product.countDocuments()
	const totalPages = Math.ceil(totalDocs / pageSize)
	if (pageNumber === 1) {
		products = await Product.find().limit(pageSize)
	} else {
		const skips = pageSize * (pageNumber - 1)
		products = await Product.find()
			.skip(skips)
			.limit(pageSize)
	}
	res.status(200).json({ products, totalPages })
})

module.exports = router
