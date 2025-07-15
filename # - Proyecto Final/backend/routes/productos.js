
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/ultimos', productoController.getUltimos);
router.get('/mas-vendidos', productoController.getMasVendidos);
router.get('/sin-stock', productoController.getSinStock);

router.get('/', productoController.getAll);
router.post('/', productoController.create);
router.get('/:id', productoController.getById);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.remove);

module.exports = router;
