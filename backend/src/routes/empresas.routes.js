const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/empresas
router.get('/', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const empresas = await prisma.empresa.findMany({ orderBy: { created_at: 'desc' } });
    res.json(empresas);
  } catch (err) { next(err); }
});

// GET /api/v1/empresas/:id
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const empresa = await prisma.empresa.findUniqueOrThrow({ where: { id: Number(req.params.id) } });
    res.json(empresa);
  } catch (err) { next(err); }
});

// POST /api/v1/empresas
router.post('/', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const empresa = await prisma.empresa.create({ data: req.body });
    res.status(201).json(empresa);
  } catch (err) { next(err); }
});

// PUT /api/v1/empresas/:id
router.put('/:id', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const empresa = await prisma.empresa.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(empresa);
  } catch (err) { next(err); }
});

// DELETE /api/v1/empresas/:id
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    await prisma.empresa.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Empresa eliminada' });
  } catch (err) { next(err); }
});

module.exports = router;
