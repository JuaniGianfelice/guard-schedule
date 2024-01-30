const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token recibido en el servidor:", token);

  if (!token) {
    return res.status(401).json({ success: false, message: 'No se proporcionó el token de autenticación.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado.' });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido.' });
  }
};

module.exports = { authenticateUser };