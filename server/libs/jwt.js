const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
