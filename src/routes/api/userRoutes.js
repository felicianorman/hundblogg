const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../../middleware/authMiddleware')
const { deleteUserById } = require('../../controllers/api/userController')

router.delete('/:userId', isAuthenticated, deleteUserById)

module.exports = router;