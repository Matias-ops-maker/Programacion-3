
module.exports = (sequelize, DataTypes) => {
    const Movimiento = sequelize.define('Movimiento', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo: {
            type: DataTypes.ENUM('entrada', 'salida'),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'movimientos',
        timestamps: false
    });

    Movimiento.associate = (models) => {
        Movimiento.belongsTo(models.Producto, {
            foreignKey: 'producto_id',
            as: 'producto'
        });
    };

    return Movimiento;
};
