const express = require("express");
const userSchema = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login User
router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    try {
        const existingUser = await userSchema.findOne({ user });

        if (!existingUser) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.hashed_password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: existingUser._id, user: existingUser.user }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 24
        });

        res.status(200).json({ auth: true, success: true, token, userId: existingUser.user_id, user: existingUser.user, message: 'Inicio de sesion exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor al iniciar sesión.'});
    }
})

module.exports = router;
