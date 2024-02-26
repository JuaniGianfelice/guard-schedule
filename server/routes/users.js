const express = require('express');
const userSchema = require('../Models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { generateToken } = require('../libs/jwt');

const router = express.Router();

// Create user
router.post("/users", async (req, res) => {
  const { user, password, rol, calendar_type } = req.body;
  const generateUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await userSchema.findOne({ user });

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const sanitizedUser = user.toLowerCase().trim();
    const userData = {
      user_id: generateUserId,
      user: sanitizedUser,
      hashed_password: hashedPassword,
      rol: rol,
      calendar_type: calendar_type,
    };
    const newUser = new userSchema(userData);
    await newUser.save();

    const token = generateToken({ userId: newUser._id, user: sanitizedUser, rol: rol }); // Generamos el token JWT
    res.cookie('token', token); // Establecemos el token en una cookie
    res.status(201).json({ success: true, token, userId: generateUserId, user: sanitizedUser });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor al crear usuario.' });
  }
});

module.exports = router;



/* User CRUD
//get all user
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, hashed_password, rol, calendar_type } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, hashed_password, rol, calendar_type } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

module.exports = router;
*/
