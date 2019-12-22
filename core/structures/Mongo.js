const mongoose = require('mongoose');

module.exports = ({ log }) => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const Mongo = mongoose.connection;

	Mongo.on('open', () => log('Database connected', { tags: ['Mongo'], color: 'cyan' }));
	Mongo.on('error', (error) => log(error.message, { tags: ['Mongo'], color: 'red' }));
};