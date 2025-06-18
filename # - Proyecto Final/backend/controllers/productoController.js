
const { Producto, Categoria } = require('../models');

exports.getAll = async (req, res) => {
    const productos = await Producto.findAll({ include: 'categoria' });
    res.json(productos);
};

exports.getById = async (req, res) => {
    const producto = await Producto.findByPk(req.params.id, { include: 'categoria' });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
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
