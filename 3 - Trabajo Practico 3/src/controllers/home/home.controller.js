const home = async (req, res) => {
  res.render("index", {
    title: "Sistema de Gestión de Clínica",
    message: "Bienvenido al Sistema de Gestión de Clínica",
  });
};
module.exports = {
  home,
};
