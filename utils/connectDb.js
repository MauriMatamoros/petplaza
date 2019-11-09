const mongoose = require('mongoose')
const connection = {}

const connectDB = async () => {
	if (connection.isConnected) {
		console.log('Using existing connection')
		return
	}
	const db = await mongoose.connect(process.env.MONGO_SRV, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	console.log('DB Connected')
	//Serverless architecture
	connection.isConnected = db.connections[0].readyState
}

module.exports = connectDB
