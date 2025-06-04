const express = require("express");
const dotenv = require("dotenv");
const rutaPacientes = require("./routes/pacientes.route.js");
const home = require("./routes/home.routes.js");
const morgan = require("morgan");
const rutaTurnos = require("./routes/turnos.route.js");
dotenv.config();

class Server {
  constructor(template = process.env.TEMPLATE || "ejs") {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middleware();
    this.engine(template);
    this.rutas();
  }
  engine(template) {
    try {
      require.resolve(template);
      this.app.set("view engine", template);
      this.app.set("views", "./src/views/" + template);
    } catch (error) {
      console.log("Error al configurar el motor de plantillas:", template);
    }
  }
  middleware() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  rutas() {
    this.app.use("/api/v1/pacientes", rutaPacientes);
    this.app.use("/api/v1/turnos", rutaTurnos);
    this.app.use("/", home);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      );
    });
  }
}

module.exports = Server;
