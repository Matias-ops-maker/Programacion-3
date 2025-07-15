const { Producto, Categoria, Venta, sequelize } = require('../models');

exports.getAll = async (req, res) => {
    const productos = await Producto.findAll({ include: 'categoria' });
    const productosFront = productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria ? p.categoria.nombre : null,
        cantidad: p.stock,
        precio: p.precio,
        estado: p.estado,
        fecha_de_ingreso: p.fecha_de_ingreso
    }));
    res.json({ productos: productosFront });
};

exports.getById = async (req, res) => {
    const producto = await Producto.findByPk(req.params.id, { include: 'categoria' });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria ? producto.categoria.nombre : null,
        cantidad: producto.stock,
        precio: producto.precio,
        estado: producto.estado,
        fecha_de_ingreso: producto.fecha_de_ingreso
    });
};

exports.create = async (req, res) => {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    await Producto.update(req.body, { where: { id } });
    res.sendStatus(204);
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.sendStatus(204);
};

exports.getUltimos = async (req, res) => {
    const productos = await Producto.findAll({
        order: [['fecha_de_ingreso', 'DESC']],
        limit: 5,
        include: 'categoria'
    });
    const productosFront = productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria ? p.categoria.nombre : null,
        cantidad: p.stock,
        precio: p.precio,
        estado: p.estado,
        fecha_de_ingreso: p.fecha_de_ingreso
    }));
    res.json({ productos: productosFront });
};

// Los 5 productos mas vendidos
exports.getProductosMasVendidos = async (req, res) => {
    try {
        const productos = await Venta.findAll({
            attributes: [
                'producto_id',
                [sequelize.fn('SUM', sequelize.col('cantidad_vendida_producto')), 'total_vendido']
            ],
            group: ['producto_id', 'producto.id', 'producto.categoria_id', 'producto.nombre', 'producto.stock', 'producto.precio', 'producto.estado', 'producto.fecha_de_ingreso'],
            order: [[sequelize.literal('total_vendido'), 'DESC']],
            limit: 5,
            include: [{ model: Producto, as: 'producto', include: 'categoria' }]
        });
        const productosFront = productos.map(v => ({
            id: v.producto.id,
            nombre: v.producto.nombre,
            categoria: v.producto.categoria ? v.producto.categoria.nombre : null,
            cantidad: v.producto.stock,
            precio: v.producto.precio,
            estado: v.producto.estado,
            fecha_de_ingreso: v.producto.fecha_de_ingreso,
            total_vendido: v.dataValues.total_vendido
        }));
        res.json({ productos: productosFront });
    } catch (error) {
        console.error("Error al obtener productos más vendidos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getSinStock = async (req, res) => {
    const productos = await Producto.findAll({
        where: { stock: 0 },
        order: [['fecha_de_ingreso', 'DESC']],
        limit: 5,
        include: 'categoria'
    });
    const productosFront = productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria ? p.categoria.nombre : null,
        cantidad: p.stock,
        precio: p.precio,
        estado: p.estado,
        fecha_de_ingreso: p.fecha_de_ingreso
    }));
    res.json({ productos: productosFront });
};
