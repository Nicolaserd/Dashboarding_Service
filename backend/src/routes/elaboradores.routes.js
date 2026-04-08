const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/elaboradores
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const elaboradores = await prisma.elaborador.findMany({
      include: { usuario: { select: { nombre: true, email: true, avatar_url: true } } },
    });
    res.json(elaboradores);
  } catch (err) { next(err); }
});

// GET /api/v1/elaboradores/:id
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const elaborador = await prisma.elaborador.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
      include: { usuario: { select: { nombre: true, email: true } } },
    });
    res.json(elaborador);
  } catch (err) { next(err); }
});

// PUT /api/v1/elaboradores/perfil
router.put('/perfil', verifyToken, requireRole('elaborador'), async (req, res, next) => {
  try {
    const { especialidad, nivel, habilidades, tarifa_hora_usd, disponible } = req.body;
    const elaborador = await prisma.elaborador.upsert({
      where: { usuario_id: req.user.id },
      update: { especialidad, nivel, habilidades, tarifa_hora_usd, disponible },
      create: { usuario_id: req.user.id, especialidad, nivel, habilidades, tarifa_hora_usd, disponible },
    });
    res.json(elaborador);
  } catch (err) { next(err); }
});

module.exports = router;
