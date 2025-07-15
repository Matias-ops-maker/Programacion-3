const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/mas-vendidas', categoriaController.getMasVendidas);

router.get('/', categoriaController.getAll);
router.post('/', categoriaController.create);
router.get('/:id', categoriaController.getById);
router.put('/:id', categoriaController.update);
router.delete('/:id', categoriaController.remove);

module.exports = router;
