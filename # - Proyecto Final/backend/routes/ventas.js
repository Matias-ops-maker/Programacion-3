const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Endpoints de fran y nico para mostrar en el frontend
router.get('/ultimas', ventaController.getUltimas);

router.get('/', ventaController.getAll);
router.post('/', ventaController.create);


module.exports = router;