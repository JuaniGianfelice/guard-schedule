require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 8252;

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Server iniciado en puerto ${PORT}`));
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB:', error);
    process.exit(1);
  });