const express = require('express');
const userController = require('../Controllers/userController.js');
const authMiddleware = require('../Middlewares/authemiddleware.js');
const router = express.Router();


router.post('/register', userController.register);// Define la ruta para registrar un nuevo usuario
router.post('/login', userController.login); // Define la ruta para iniciar sesión
router.get('/users', authMiddleware, userController.getUsers);// Define la ruta para obtener todos los usuarios y la autentica
router.put('/users/:id', authMiddleware, userController.updateUser);// Define la ruta para actualizar un usuario y la autentica
router.delete('/users/:id', authMiddleware, userController.deleteUser);// Define la ruta para eliminar un usuario y la autentica

module.exports = router;