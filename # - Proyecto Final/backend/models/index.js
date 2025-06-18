// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
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
    dialectOptions: dbConfig.dialectOptions
  }
);
const Producto = require('./producto')(sequelize, DataTypes);
const Categoria = require('./Categoria')(sequelize, DataTypes);
const Movimiento = require('./movimiento')(sequelize, DataTypes);

if (Producto.associate) Producto.associate({ Categoria, Movimiento });
if (Categoria.associate) Categoria.associate({ Producto });
if (Movimiento.associate) Movimiento.associate({ Producto });


module.exports = {
  sequelize,
  Sequelize,
  Producto,
  Categoria,
  Movimiento
};