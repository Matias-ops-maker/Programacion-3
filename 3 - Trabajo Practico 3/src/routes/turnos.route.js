const {Router} = require('express');
const turnosController = require('../controllers/API/turnos.controller.js')
const rutaTurnos = Router();
rutaTurnos.get('/', turnosController.list);
rutaTurnos.post('/',turnosController.create);
rutaTurnos.put('/:id',turnosController.update);
rutaTurnos.delete('/:id',turnosController.delete);
rutaTurnos.get('/:idPaciente',turnosController.searchByIdPaciente);

//Otras rutas CRUD


module.exports = rutaTurnos;