const express = require('express')
const Stripe = require('stripe')
const uuidv4 = require('uuid/v4')

const Cart = require('../../models/Cart')
const Order = require('../../models/Order')
// consted Product due to the serverless architecture.
// Albeit being unused it still loads if the route is visited directly ergo preventing an error,
// in which it isn't loaded.
const Product = require('../../models/Product')
const calculateCartTotal = require('../../../utils/calculateCartTotal')
const auth = require('../../middleware/auth')
const connectDb = require('../../../utils/connectDb')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

connectDb()

const router = express.Router()

router.post('/checkout', auth, async (req, res) => {
	const { paymentData } = req.body
	try {
		const cart = await Cart.findOne({ user: req.user._id }).populate({
			path: 'products.product',
			model: 'Product'
		})
		const { cartTotal, stripeTotal } = calculateCartTotal(cart.products)
		const prevCustomer = await stripe.customers.list({
			email: paymentData.email,
			limit: 1
		})
		const isExistingCustomer = prevCustomer.data.length > 0
		let newCustomer
		if (!isExistingCustomer) {
			newCustomer = await stripe.customers.create({
				email: paymentData.email,
				source: paymentData.id
			})
		}
		const customer =
			(isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id
		await stripe.charges.create(
			{
				currency: 'usd',
				amount: stripeTotal,
				receipt_email: paymentData.email,
				customer,
				description: `Checkout | ${paymentData.email} | ${paymentData.id}`
			},
			{
				idempotency_key: uuidv4()
			}
		)
		await new Order({
			user: req.user._id,
			email: paymentData.email,
			total: cartTotal,
			products: cart.products
		}).save()
		await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } })
		res.status(200).send('Checkout successful.')
	} catch (error) {
		console.error(error)
		res.status(500).send('Error processing charge.')
	}
})

module.exports = router
