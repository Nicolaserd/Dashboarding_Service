require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const empresasRoutes = require('./routes/empresas.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const elaboradoresRoutes = require('./routes/elaboradores.routes');
const proyectosRoutes = require('./routes/proyectos.routes');
const dashboardsRoutes = require('./routes/dashboards.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const alertasRoutes = require('./routes/alertas.routes');
const errorHandler = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 3001;

// Seguridad y utilidades
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting global
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200,
    message: { error: 'Demasiadas solicitudes, intenta más tarde.' },
  })
);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Rutas API v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/empresas', empresasRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/elaboradores', elaboradoresRoutes);
app.use('/api/v1/proyectos', proyectosRoutes);
app.use('/api/v1/dashboards', dashboardsRoutes);
app.use('/api/v1/servicios', serviciosRoutes);
app.use('/api/v1/alertas', alertasRoutes);

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`DataFlow Studio API corriendo en http://localhost:${PORT}`);
});

module.exports = app;
