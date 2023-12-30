const express = require("express");
const userSchema = require("../models/user-model");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Create user
router.post("/users", async (req, res) => {
  const { user, password, rol, calendar } = req.body;
  const generateUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await userSchema.findOne({ user });

    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exists' });
    }

    const sanitizedUser = user.toLowerCase();
    const userData = {
      name: sanitizedUser,
      user_id: generateUserId,
      user: sanitizedUser,
      hashed_password: hashedPassword,
      rol: rol, 
      calendario: calendar,
    };

    const newUser = new userSchema(userData);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, user: sanitizedUser }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ success: true, token, userId: generateUserId, user: sanitizedUser });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ success: false, message: error.message || "Error interno del servidor al crear usuario.", error: error });
  }
});

module.exports = router;



/* CRUD
//create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

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
  const { name, hashed_password, rol, calendar } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, hashed_password, rol, calendar } })
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
