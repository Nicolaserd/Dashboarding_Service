const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/servicios — catálogo público
router.get('/', async (_req, res, next) => {
  try {
    const servicios = await prisma.catalogoServicio.findMany({ where: { activo: true } });
    res.json(servicios);
  } catch (err) { next(err); }
});

// POST /api/v1/servicios — solo admin
router.post('/', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const servicio = await prisma.catalogoServicio.create({ data: req.body });
    res.status(201).json(servicio);
  } catch (err) { next(err); }
});

// PUT /api/v1/servicios/:id
router.put('/:id', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const servicio = await prisma.catalogoServicio.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(servicio);
  } catch (err) { next(err); }
});

module.exports = router;
