/**
 * Siembra datos de demostración: usuarios de prueba y guardias de ejemplo.
 *
 * BORRA todos los usuarios y eventos de la base a la que apunte DATABASE_URL.
 * Por eso exige ALLOW_SEED=true, para que no se ejecute por accidente contra
 * una base con datos reales.
 *
 *   ALLOW_SEED=true npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./Models/userModel');
const EventGuard = require('./Models/eventGuardModel');
const EventUti = require('./Models/eventUtiModel');

const USUARIOS = [
  { user: 'admin',          password: 'admin1',        rol: 'Admin',       calendar_type: 'Admin' },
  { user: 'coordinador',    password: 'coordinador1',  rol: 'Coordinador', calendar_type: 'Guardia' },
  { user: 'coordinadoruti', password: 'coordinador1',  rol: 'Coordinador', calendar_type: 'Uti' },
  { user: 'medico',         password: 'medico1',       rol: 'Medico',      calendar_type: 'Guardia' },
];

const MEDICOS = ['Dr. Álvarez', 'Dra. Benítez', 'Dr. Cardozo', 'Dra. Duarte', 'Dr. Esposito'];

function guardiasDelMes(cantidad) {
  const hoy = new Date();
  const eventos = [];
  for (let i = 0; i < cantidad; i++) {
    const dia = new Date(hoy.getFullYear(), hoy.getMonth(), 1 + (i * 2) % 27, 8, 0, 0);
    eventos.push({ title: MEDICOS[i % MEDICOS.length], date: dia });
  }
  return eventos;
}

async function main() {
  if (process.env.ALLOW_SEED !== 'true') {
    console.error('Abortado: este script borra datos. Ejecutalo con ALLOW_SEED=true.');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('Abortado: falta DATABASE_URL.');
    process.exit(1);
  }

  await mongoose.connect(process.env.DATABASE_URL);
  console.log('Conectado a MongoDB');

  await Promise.all([
    User.deleteMany({}),
    EventGuard.deleteMany({}),
    EventUti.deleteMany({}),
  ]);
  console.log('Base vaciada');

  for (const u of USUARIOS) {
    await User.create({
      user: u.user,
      hashed_password: await bcrypt.hash(u.password, 10),
      rol: u.rol,
      calendar_type: u.calendar_type,
    });
    console.log(`  usuario ${u.user} (${u.rol}/${u.calendar_type})`);
  }

  await EventGuard.insertMany(guardiasDelMes(12));
  await EventUti.insertMany(guardiasDelMes(8));
  console.log('  12 guardias y 8 turnos de UTI');

  await mongoose.disconnect();
  console.log('Listo.');
}

main().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});
