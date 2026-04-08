const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/usuarios/me
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUniqueOrThrow({
      where: { id: req.user.id },
      select: { id: true, nombre: true, email: true, tipo_usuario: true, telefono: true, avatar_url: true, activo: true },
    });
    res.json(usuario);
  } catch (err) { next(err); }
});

// GET /api/v1/usuarios
router.get('/', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nombre: true, email: true, tipo_usuario: true, activo: true, created_at: true },
    });
    res.json(usuarios);
  } catch (err) { next(err); }
});

// PUT /api/v1/usuarios/me
router.put('/me', verifyToken, async (req, res, next) => {
  try {
    const { nombre, telefono, avatar_url } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id: req.user.id },
      data: { nombre, telefono, avatar_url },
      select: { id: true, nombre: true, email: true, telefono: true, avatar_url: true },
    });
    res.json(usuario);
  } catch (err) { next(err); }
});

module.exports = router;
