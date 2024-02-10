const express = require('express');
const userSchema = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login user
router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    try {
        console.log("Inicio de sesión:", user);

        const existingUser = await userSchema.findOne({ user: user.trim().toLowerCase() }).lean().exec();
        if (!existingUser) {
            console.log("Usuario no encontrado en la base de datos");
            return res.status(401).json({ success: false, message: 'Usuario incorrecto' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.hashed_password);
        if (!passwordMatch) {
            console.log("Contraseña no coincide");
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({
            userId: existingUser._id,
            user: existingUser.user,
            rol: existingUser.rol,
            calendar_type: existingUser.calendar_type
        },
            process.env.TOKEN_SECRET, {
            expiresIn: 60 * 24,
        });

        res.cookie('token', token, { httpOnly: true, secure: true }); // Opciones para configurar correctamente las cookies
        res.json({
            success: true,
            token,
            userId: existingUser.user_id,
            user: existingUser.user,
            rol: existingUser.rol,
            calendar_type: existingUser.calendar_type,
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor al iniciar sesión." });
    }
});

// Logout user
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Cierre de sesión exitoso' });
});

module.exports = router;
