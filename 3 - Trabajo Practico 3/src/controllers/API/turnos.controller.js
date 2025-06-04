const turnosModel = require("./../../models/mock/turnos.models.js");
const Turno = require("../../models/mock/entities/turno.entity.js");

class TurnosController {
  async list(req, res) {
    res.status(200).json(await turnosModel.list());
  }
  async create(req, res) {
    const { fecha, hora, idPaciente } = req.body;

    const nuevoTurno = new Turno(fecha, hora, idPaciente);

    const info = await turnosModel.create(nuevoTurno);
    res.status(200).json(info);
  }
  delete(req, res) {
    const id = req.params.id;
    turnosModel.delete(id);
    res.status(200).json({ message: "turno eliminado" });
  }
  update(req, res) {
    const id = req.params.id;
    const { fecha, hora, idPaciente } = req.body;
    const nuevoTurno = new Turno(fecha, hora, idPaciente);
    turnosModel.update(id, nuevoTurno);
    res.status(200).json({ message: "actualizado" });
  }
  async searchByIdPaciente(req, res) {
    const idPaciente = req.params.idPaciente;
    const turnos = await turnosModel.searchByIdPaciente(idPaciente);
    res.status(200).json(turnos);
  }
}

module.exports = new TurnosController();
