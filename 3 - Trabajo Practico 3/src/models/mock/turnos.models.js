const TurnoPaciente = require("./entities/turno.entity.js");

class TurnosModel {
  constructor() {
    this.data = [];
    this.data.push(new TurnoPaciente("24/05/2020", "21:30", 1, 1));
    this.id = 2;
  }
  // crea un dato nuevo (turno de cliente)
  create(turno) {
    //TODO: verificar que no sea nulo si es nulo tirar excepcion

    //return turno;
    return new Promise((resolve, reject) => {
      turno.id = this.id;
      this.id++;
      this.data.push(turno);

      resolve(turno);
    });
  }
  // actualiza los datos del turno con id = id
  update(id, turno) {
    try {
      const turnoEncontrado = this.data.find((p) => p.id == id);
      if (turno === null) {
        throw new Error("No se encuntra el turno");
      }
      turnoEncontrado.fecha = turno.fecha;
      turnoEncontrado.hora = turno.hora;
      turnoEncontrado.idPaciente = turno.idPaciente;
    } catch (error) {
      console.log(error.message());
    }
  }
  // elimina el turno con id = id
  delete(id) {
    try {
      const turnoEncontrado = this.data.find((p) => p.id == id);
      const pos = this.data.indexOf(turnoEncontrado);
      this.data.splice(pos, 1); // elimina el elemento de la posición pos del arreglo
    } catch (error) {
      console.log("Error: el id no existe");
    }
  }
  // devuelve la lista completa en un arreglo de strings
  list() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  } // devuelve el turno con idPaciente = idPaciente
  searchByIdPaciente(idPaciente) {
    return new Promise((resolve, reject) => {
      const turnos = this.data.filter(
        (element) => element.idPaciente == idPaciente
      );
      resolve(turnos);
    });
  }
}

module.exports = new TurnosModel();
