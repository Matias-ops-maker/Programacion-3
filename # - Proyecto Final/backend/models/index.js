// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions,
  }
);
const Producto = require("./Producto")(sequelize, DataTypes);
const Categoria = require("./Categoria")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Venta = require("./Venta")(sequelize, DataTypes);

if (Producto.associate) Producto.associate({ Categoria });
if (Categoria.associate) Categoria.associate({ Producto });
if (Venta.associate) Venta.associate({ Producto, Categoria });
if (User.associate) User.associate({});

module.exports = {
  sequelize,
  Sequelize,
  Producto,
  Categoria,
  Venta,
  User,
};
