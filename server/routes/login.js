const express = require("express");
const userSchema = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login user
router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    try {
        console.log("Intento de inicio de sesión:", user);

        const existingUser = await userSchema.findOne({ user: user.trim().toLowerCase() }).lean().exec();
        if (!existingUser) {
            console.log("Usuario no encontrado en la base de datos");
            return res.status(401).json({ success: false, message: 'Usuario incorrecto' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.hashed_password);
        if (!passwordMatch) {
            console.log("Contraseña no coincide");
            return res.status(401).json({ success: false, message: 'Contraseña incorrecto' });
        }

        const token = jwt.sign({ 
            userId: existingUser._id,
            user: existingUser.user,
            rol: existingUser.rol
        },
        process.env.TOKEN_SECRET, {
            expiresIn: 60 * 24,
        });

        res.cookie('token', token);
        res.json({
            success: true,
            token,
            userId: existingUser.user_id,
            user: existingUser.user,
            rol: existingUser.rol,
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor al iniciar sesión." });
    }
});

module.exports = router;
