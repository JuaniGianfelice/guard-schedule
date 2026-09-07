# Calendar Guard

[![CI](https://github.com/JuaniGianfelice/guard-schedule/actions/workflows/ci.yml/badge.svg)](https://github.com/JuaniGianfelice/guard-schedule/actions/workflows/ci.yml)

Aplicación web para la carga y el control de guardias médicas, construida con
el stack MERN. Estuvo en uso en una clínica privada.

---

## El problema

En la clínica, las guardias médicas se anotaban en una planilla compartida.
Cada médico avisaba por mensaje qué turnos había cubierto, y una persona de
administración transcribía todo a mano para cerrar el mes.

Eso traía tres problemas concretos: la planilla no reflejaba quién estaba de
guardia en tiempo real, los avisos se perdían entre conversaciones, y el
control de fin de mes era trabajo manual repetido.

## La solución

Un calendario web con acceso por rol, donde cada guardia se carga una sola vez
y queda visible para todos. Los coordinadores cargan turnos sobre el calendario
que les corresponde (guardia general o UTI), los médicos consultan el suyo, y
la administración tiene una vista completa más el alta de usuarios.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 18 (Create React App), React Router 6, FullCalendar, SASS |
| Backend | Node.js, Express 4 |
| Base de datos | MongoDB con Mongoose |
| Autenticación | JWT + bcrypt |
| Tests | Jest |
| CI | GitHub Actions |

---

## Cómo levantarlo

### Requisitos

- Node.js 20 o superior (desarrollado sobre Node 26)
- Una instancia de MongoDB: local, en Docker, o un cluster de MongoDB Atlas

### 1. Clonar e instalar

```bash
git clone https://github.com/JuaniGianfelice/guard-schedule.git
cd guard-schedule

cd server && npm install
cd ../client && npm install
```

### 2. Variables de entorno

El repositorio incluye un `.env.example` en cada carpeta con las variables
necesarias y ningún valor real. Copialos y completalos:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

En `server/.env` hay que definir:

| Variable | Para qué |
|---|---|
| `DATABASE_URL` | Cadena de conexión a MongoDB |
| `TOKEN_SECRET` | Secreto con el que se firman los JWT |
| `PORT` | Puerto de la API (por defecto 8252) |

Para generar un `TOKEN_SECRET` propio:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

En `client/.env` sólo hace falta `REACT_APP_BE_URL`, apuntando a la API.

### 3. Sembrar datos de prueba

```bash
cd server
ALLOW_SEED=true npm run seed
```

Crea cuatro usuarios de demostración, doce guardias y ocho turnos de UTI del
mes en curso.

> El script **borra** todos los usuarios y eventos de la base a la que apunte
> `DATABASE_URL`. Por eso exige la variable `ALLOW_SEED`: para que no pueda
> ejecutarse por accidente contra una base con datos reales.

En PowerShell la variable se define aparte:

```powershell
$env:ALLOW_SEED="true"; npm run seed
```

### 4. Levantar

En dos terminales:

```bash
cd server && npm start     # API en http://localhost:8252
cd client && npm start     # Interfaz en http://localhost:3000
```

## Usuarios de prueba

Los crea el script de seed. La pantalla inicial también los lista.

| Usuario | Contraseña | Rol | Qué ve |
|---|---|---|---|
| `admin` | `admin1` | Admin | Ambos calendarios y el alta de usuarios |
| `coordinador` | `coordinador1` | Coordinador | Calendario de guardia general |
| `coordinadoruti` | `coordinador1` | Coordinador | Calendario de UTI |
| `medico` | `medico1` | Médico | Vista de consulta |

---

## API

Todas las rutas cuelgan de `/api`.

| Método | Ruta | Qué hace |
|---|---|---|
| `POST` | `/login` | Valida credenciales y devuelve un JWT |
| `POST` | `/logout` | Limpia la cookie de sesión |
| `POST` | `/users` | Crea un usuario con rol y tipo de calendario |
| `GET` | `/eventsGuard` | Lista las guardias generales |
| `POST` | `/eventsGuard` | Carga una guardia general |
| `GET` | `/eventsUti` | Lista los turnos de UTI |
| `POST` | `/eventsUti` | Carga un turno de UTI |

## Estructura

```
guard-schedule/
├── .github/workflows/ci.yml   Integración continua
├── client/                    React
│   └── src/
│       ├── components/        Calendarios, modales, alta de usuarios
│       └── pages/             Landing, login y un dashboard por rol
└── server/                    Express
    ├── app.js                 Arma la aplicación y la exporta
    ├── server.js              Conecta a MongoDB y escucha
    ├── seed.js                Datos de demostración
    ├── Controllers/           Autenticación
    ├── Models/                Esquemas de Mongoose
    ├── routes/                Endpoints
    └── test/                  Tests
```

## Tests

```bash
cd server
npm test
```

La suite se está construyendo. Hoy cubre únicamente la verificación de que el
entorno de testing está correctamente conectado. Los tests de integración sobre
la API —carga de guardias y modelo de permisos— están en desarrollo; el detalle
está en la sección siguiente.

La integración continua corre `npm ci` y `npm test` sobre Ubuntu con Node 26 en
cada Pull Request y en cada push a `master`. El badge del encabezado refleja el
estado de la última corrida.

---

## Estado del proyecto

Este repositorio está siendo retomado y llevado a un estándar de producción.
Lo que sigue es el estado real, no una lista de deseos.

**Hecho**

- Separación de `app.js` y `server.js`, de modo que la aplicación pueda
  importarse sin abrir un puerto ni conectarse a la base.
- El servidor sólo empieza a aceptar pedidos si MongoDB conectó.
- Integración continua ejecutando la suite en cada PR.
- Script de datos de demostración y `.env.example` documentados.
- Corrección de rutas de importación que sólo resolvían en Windows y rompían
  cualquier build sobre Linux.

**Pendiente**

- Middleware de autenticación y autorización en la API. Hoy el rol viaja en el
  JWT y el frontend lo usa para decidir qué mostrar, pero los endpoints no lo
  validan.
- Suite de tests de integración sobre los endpoints.
- Módulo de liquidación de honorarios. El componente existe como maqueta
  (`client/src/components/summary/`) pero no tiene lógica, y está desconectado
  del menú hasta que se implemente.
- Empaquetado con Docker y despliegue.
- Migración de un módulo a TypeScript.

## Decisiones técnicas

**`app.js` separado de `server.js`.** Un módulo que se importa no debería tener
efectos secundarios al importarse. `app.js` construye la aplicación y la
exporta; `server.js` es el único que conecta a la base y escucha un puerto. Eso
permite que los tests trabajen contra la aplicación sin levantar un servidor, y
que la plataforma de despliegue controle el arranque.

**`npm ci` en la integración continua.** Instala las versiones exactas del
`package-lock.json` sin actualizar nada, de modo que la corrida sea
reproducible.

**El seed exige una variable explícita.** Un script destructivo no debería poder
ejecutarse por accidente.

**Los `.env` no se versionan; los `.env.example` sí.** El código se publica, la
configuración y los datos no.
