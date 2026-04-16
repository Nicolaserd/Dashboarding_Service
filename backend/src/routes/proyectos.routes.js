const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const prisma = require('../config/database');

// GET /api/v1/proyectos
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { tipo_usuario, id } = req.user;
    let where = {};
    if (tipo_usuario === 'empresa') {
      const empresaUsuario = await prisma.usuarioEmpresa.findFirst({ where: { usuario_id: id } });
      if (empresaUsuario) where.empresa_id = empresaUsuario.empresa_id;
    } else if (tipo_usuario === 'elaborador') {
      const elaborador = await prisma.elaborador.findUnique({ where: { usuario_id: id } });
      if (elaborador) where.elaborador_id = elaborador.id;
    }
    const proyectos = await prisma.proyecto.findMany({
      where,
      include: { empresa: true, elaborador: { include: { usuario: { select: { nombre: true } } } } },
      orderBy: { created_at: 'desc' },
    });
    res.json(proyectos);
  } catch (err) { next(err); }
});

// GET /api/v1/proyectos/:id
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const proyecto = await prisma.proyecto.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
      include: { empresa: true, elaborador: { include: { usuario: true } }, dashboards: true },
    });
    res.json(proyecto);
  } catch (err) { next(err); }
});

// POST /api/v1/proyectos
router.post('/', verifyToken, requireRole('admin', 'empresa'), async (req, res, next) => {
  try {
    const proyecto = await prisma.proyecto.create({ data: req.body });
    res.status(201).json(proyecto);
  } catch (err) { next(err); }
});

// PUT /api/v1/proyectos/:id
router.put('/:id', verifyToken, requireRole('admin', 'empresa', 'elaborador'), async (req, res, next) => {
  try {
    const proyecto = await prisma.proyecto.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(proyecto);
  } catch (err) { next(err); }
});

module.exports = router;
