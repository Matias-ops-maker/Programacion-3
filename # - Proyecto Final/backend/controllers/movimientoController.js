
const { Movimiento, Producto } = require('../models');

exports.getAll = async (req, res) => {
    const movimientos = await Movimiento.findAll({ include: 'producto' });
    res.json(movimientos);
};

exports.getById = async (req, res) => {
    const movimiento = await Movimiento.findByPk(req.params.id, { include: 'producto' });
    if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
    res.json(movimiento);
};

exports.create = async (req, res) => {
    const { producto_id, cantidad, tipo } = req.body;

    const producto = await Producto.findByPk(producto_id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    if (tipo === 'entrada') {
        producto.stock += cantidad;
    } else if (tipo === 'salida') {
        if (producto.stock < cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente' });
        }
        producto.stock -= cantidad;
    } else {
        return res.status(400).json({ error: 'Tipo inválido' });
    }

    await producto.save();
    const movimiento = await Movimiento.create({ producto_id, cantidad, tipo });
    res.status(201).json(movimiento);
};
