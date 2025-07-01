module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define('Venta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categorias',
                key: 'id'
            }
        },
        cantidad_vendida_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        producto_precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        cantidad_vendida_precio: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'ventas',
        timestamps: false
    });

    Venta.associate = (models) => {
        Venta.belongsTo(models.Producto, {
            foreignKey: 'producto_id',
            as: 'producto'
        });
        Venta.belongsTo(models.Categoria, {
            foreignKey: 'categoria_id',
            as: 'categoria'
        });
    };

    return Venta;
};