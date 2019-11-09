const express = require('express')

const Product = require('../../models/Product')
const Cart = require('../../models/Cart')
const auth = require('../../middleware/auth')

const connectDb = require('../../../utils/connectDb')

connectDb()

const router = express.Router()

router.get('/product/:_id', async (req, res) => {
	const product = await Product.findById(req.params._id)
	res.status(200).json(product)
})

router.delete('/product/:_id', auth, async (req, res) => {
	try {
		const { _id } = req.params
		const product = await Product.findByIdAndDelete(_id)
		//remove product from all carts, references as product | cascade delete
		await Cart.updateMany(
			{ 'products.product': _id },
			{ $pull: { products: { product: _id } } }
		)
		res.status(204).json({ product })
	} catch (error) {
		console.error(error)
		res.status(500).send('Error deleting product')
	}
})

router.post('/product', auth, async (req, res) => {
	try {
		const { name, price, description, mediaUrl } = req.body
		if (!name || !price || !description || !mediaUrl) {
			return res.status(422).send('Product missing one or more fields')
		}
		if (!(req.user.role === 'root' || req.user.role === 'admin')) {
			return res.status(401).send('Not enough privilages')
		}
		const product = await new Product({
			name,
			price,
			description,
			mediaUrl
		}).save()
		res.status(201).json({ product })
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error.')
	}
})

module.exports = router
