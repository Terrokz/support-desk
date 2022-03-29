const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
         ref: 'User'
		},
		product: {
			type: String,
			required: [true, 'Please select a product'],
			enum: ['iPhone 13', 'Realme 6', 'Samsung Galaxy S10', 'Xiaomi Mi 10']
		},
		description: {
			type: String,
			required: [true, 'Please enter a description of the issue'],
		},
		status: {
			type: String,
			required: true,
			enum: ['new', 'open', 'closed'],
         default: 'true'
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Ticket', ticketSchema)
