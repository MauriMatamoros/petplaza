const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'http://157.245.135.246:3000'
		: 'http://localhost:3000'

module.exports = baseUrl
