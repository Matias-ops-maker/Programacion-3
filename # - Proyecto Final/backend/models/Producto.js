
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
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'activo'
        },
        fecha_de_ingreso: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
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
    };

    return Producto;
};