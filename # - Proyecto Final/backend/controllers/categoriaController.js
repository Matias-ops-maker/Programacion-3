
const { Categoria } = require('../models');

exports.getAll = async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
};

exports.getById = async (req, res) => {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(categoria);
};

exports.create = async (req, res) => {
    const nueva = await Categoria.create(req.body);
    res.status(201).json(nueva);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    await Categoria.update(req.body, { where: { id } });
    res.sendStatus(204);
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    await Categoria.destroy({ where: { id } });
    res.sendStatus(204);
};
