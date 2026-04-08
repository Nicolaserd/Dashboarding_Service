const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');

// POST /api/v1/auth/register
router.post(
  '/register',
  [
    body('nombre').trim().notEmpty().withMessage('Nombre requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
    body('tipo_usuario').isIn(['empresa', 'elaborador']).withMessage('Tipo de usuario inválido'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { nombre, email, password, tipo_usuario } = req.body;
      const password_hash = await bcrypt.hash(password, 12);
      const usuario = await prisma.usuario.create({
        data: { nombre, email, password_hash, tipo_usuario },
      });
      res.status(201).json({ message: 'Usuario creado', usuario: { id: usuario.id, email: usuario.email } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/v1/auth/login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario || !usuario.activo) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const valid = await bcrypt.compare(password, usuario.password_hash);
      if (!valid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, tipo_usuario: usuario.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      await prisma.usuario.update({ where: { id: usuario.id }, data: { ultimo_login: new Date() } });
      res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, tipo_usuario: usuario.tipo_usuario } });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
