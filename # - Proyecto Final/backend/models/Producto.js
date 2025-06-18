
module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'productos',
        timestamps: false
    });

    Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
            foreignKey: 'categoria_id',
            as: 'categoria'
        });

        Producto.hasMany(models.Movimiento, {
            foreignKey: 'producto_id',
            as: 'movimientos'
        });
    };

    return Producto;
};