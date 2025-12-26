const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const requireRole = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, userController.getUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, requireRole('Admin'), userController.updateUser);
router.delete('/:id', authMiddleware, requireRole('Admin'), userController.deleteUser);

module.exports = router;