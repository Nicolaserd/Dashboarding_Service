const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const prisma = require('../config/database');

// GET /api/v1/alertas
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const alertas = await prisma.alerta.findMany({
      where: { activa: true },
      include: { dashboard: { select: { nombre: true } } },
    });
    res.json(alertas);
  } catch (err) { next(err); }
});

// POST /api/v1/alertas
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const alerta = await prisma.alerta.create({ data: req.body });
    res.status(201).json(alerta);
  } catch (err) { next(err); }
});

// PUT /api/v1/alertas/:id
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const alerta = await prisma.alerta.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(alerta);
  } catch (err) { next(err); }
});

// DELETE /api/v1/alertas/:id
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    await prisma.alerta.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Alerta eliminada' });
  } catch (err) { next(err); }
});

module.exports = router;
