
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cantidad_categoria_vendida: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'categorias',
        timestamps: false
    });

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            foreignKey: 'categoria_id',
            as: 'productos'
        });
    };

    return Categoria;
};
