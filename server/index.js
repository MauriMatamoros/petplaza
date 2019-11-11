const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

require('../utils/cloudinary')

app.prepare().then(() => {
	const server = express()
	server.use(express.json({ extended: false }))
	//add routes
	server.use('/api', require('./routes/api/signup'))
	server.use('/api', require('./routes/api/login'))
	server.use('/api', require('./routes/api/account'))
	server.use('/api', require('./routes/api/products'))
	server.use('/api', require('./routes/api/orders'))
	server.use('/api', require('./routes/api/cart'))
	server.use('/api', require('./routes/api/checkout'))
	server.use('/api', require('./routes/api/users'))
	server.use('/api', require('./routes/api/product'))
	server.use('/api', require('./routes/api/pet'))

	server.all('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
