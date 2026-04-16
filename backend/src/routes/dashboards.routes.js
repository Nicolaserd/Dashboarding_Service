const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/dashboards
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const dashboards = await prisma.dashboard.findMany({
      where: { activo: true },
      include: { proyecto: { select: { nombre: true, empresa: { select: { nombre: true } } } } },
    });
    res.json(dashboards);
  } catch (err) { next(err); }
});

// GET /api/v1/dashboards/:id
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const dashboard = await prisma.dashboard.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
      include: { proyecto: true, alertas: true },
    });
    res.json(dashboard);
  } catch (err) { next(err); }
});

// POST /api/v1/dashboards
router.post('/', verifyToken, requireRole('admin', 'elaborador'), async (req, res, next) => {
  try {
    const dashboard = await prisma.dashboard.create({ data: req.body });
    res.status(201).json(dashboard);
  } catch (err) { next(err); }
});

// PUT /api/v1/dashboards/:id
router.put('/:id', verifyToken, requireRole('admin', 'elaborador'), async (req, res, next) => {
  try {
    const dashboard = await prisma.dashboard.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(dashboard);
  } catch (err) { next(err); }
});

module.exports = router;
