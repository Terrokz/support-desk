const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

// re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

const {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updateTicket,
} = require('../controllers/ticketController')

router
	.route('/')
	.get(protect, getTickets)
	.post(protect, createTicket)
	.get(protect, getTicket)

router
	.route('/:id')
	.get(protect, getTicket)
	.delete(protect, deleteTicket)
	.put(protect, updateTicket)

module.exports = router
