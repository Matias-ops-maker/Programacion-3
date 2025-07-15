const { Venta, Producto, Categoria } = require('../models');

exports.getAll = async (req, res) => {
    const ventas = await Venta.findAll({
        include: [
            { model: Producto, as: 'producto' },
            { model: Categoria, as: 'categoria' }
        ]
    });
    const ventasFront = ventas.map(v => ({
        id: v.id,
        producto: v.producto ? v.producto.nombre : null,
        categoria: v.categoria ? v.categoria.nombre : null,
        cantidad_vendida_producto: v.cantidad_vendida_producto,
        producto_precio: v.producto_precio,
        cantidad_vendida_precio: v.cantidad_vendida_precio,
        fecha: v.fecha
    }));
    res.json({ ventas: ventasFront });
};

exports.create = async (req, res) => {
    const venta = await Venta.create(req.body);
    res.status(201).json(venta);
};

exports.getUltimas = async (req, res) => {
    const ventas = await Venta.findAll({
        order: [['fecha', 'DESC']],
        limit: 5,
        include: [
            { model: Producto, as: 'producto' },
            { model: Categoria, as: 'categoria' }
        ]
    });
    const ventasFront = ventas.map(v => ({
        id: v.id,
        producto: v.producto ? v.producto.nombre : null,
        categoria: v.categoria ? v.categoria.nombre : null,
        cantidad_vendida_producto: v.cantidad_vendida_producto,
        producto_precio: v.producto_precio,
        cantidad_vendida_precio: v.cantidad_vendida_precio,
        fecha: v.fecha
    }));
    res.json({ ventas: ventasFront });
};