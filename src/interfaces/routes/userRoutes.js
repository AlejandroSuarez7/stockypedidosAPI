const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../../infrastructure/auth/authMiddleware');

const router = express.Router();

// Obtener todos los usuarios (requiere autenticación)
router.get('/', authMiddleware, UserController.getAllUsers);

// Obtener perfil del usuario actual
router.get('/profile', authMiddleware, UserController.getProfile);

// Obtener usuario por ID
router.get('/:id', authMiddleware, UserController.getUserById);

module.exports = router;