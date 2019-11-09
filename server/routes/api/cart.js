const express = require('express')
const mongoose = require('mongoose')

// consted Product due to the serverless architecture.
// Albeit being unused it still loads if the route is visited directly ergo preventing an error,
// in which it isn't loaded.
const Product = require('../../models/Product')
const Cart = require('../../models/Cart')
const connectDb = require('../../../utils/connectDb')
const auth = require('../../middleware/auth')

connectDb()

const router = express.Router()
const { ObjectId } = mongoose.Types

router.delete('/cart/:_id', auth, async (req, res) => {
	try {
		const cart = await Cart.findOneAndUpdate(
			{ user: req.user._id },
			{ $pull: { products: { product: req.params._id } } },
			{ new: true }
		).populate({
			path: 'products.product',
			model: 'Product'
		})
		res.status(200).json(cart.products)
	} catch (error) {
		console.error(error)
		res.status(500).send('Please log in again.')
	}
})

router.get('/cart', auth, async (req, res) => {
	try {
		const cart = await Cart.findOne({ user: req.user._id }).populate({
			path: 'products.product',
			model: 'Product'
		})
		res.status(200).json(cart.products)
	} catch (error) {
		console.error(error)
		res.status(403).send('Please login again.')
	}
})

router.put('/cart', auth, async (req, res) => {
	try {
		const { quantity, productId } = req.body
		const cart = await Cart.findOne({ user: req.user._id })
		const productExists = cart.products.some((document) =>
			ObjectId(productId).equals(document.product)
		)
		if (productExists) {
			await Cart.findOneAndUpdate(
				{ _id: cart._id, 'products.product': productId },
				{
					$inc: {
						'products.$.quantity': quantity
					}
				}
			)
		} else {
			const newProduct = { quantity, product: productId }
			await Cart.findOneAndUpdate(
				{ _id: cart._id },
				{ $addToSet: { products: newProduct } }
			)
		}
		res.status(200).send('Cart updated.')
	} catch (error) {
		console.error(error)
		res.status(403).send('Please login again.')
	}
})

module.exports = router
