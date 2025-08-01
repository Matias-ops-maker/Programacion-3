const { Categoria, Venta } = require('../models');
const sequelize = require('sequelize');

exports.getAll = async (req, res) => {
    const categorias = await Categoria.findAll();
    const categoriasFront = categorias.map(c => ({
        id: c.id,
        nombre: c.nombre,
        descripcion: c.descripcion,
        cantidad_categoria_vendida: c.cantidad_categoria_vendida
    }));
    res.json({ categorias: categoriasFront });
};

exports.getById = async (req, res) => {
    const c = await Categoria.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({
        id: c.id,
        nombre: c.nombre,
        descripcion: c.descripcion,
        cantidad_categoria_vendida: c.cantidad_categoria_vendida
    });
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

// Endpoints de fran y nico para mostrar en el frontend
// Las 5 categorias mas vendidas
exports.getCategoriasMasVendidas = async (req, res) => {
  try {
    const categorias = await Venta.findAll({
      attributes: [
        'categoria_id',
        [sequelize.fn('SUM', sequelize.col('cantidad_vendida_producto')), 'total_vendido']
      ],
      group: ['categoria_id', 'categoria.id', 'categoria.nombre', 'categoria.descripcion', 'categoria.cantidad_categoria_vendida'],
      order: [[sequelize.literal('total_vendido'), 'DESC']],
      limit: 5,
      include: [{ model: Categoria, as: 'categoria' }]
    });
    const categoriasFront = categorias.map(v => ({
      id: v.categoria.id,
      nombre: v.categoria.nombre,
      descripcion: v.categoria.descripcion,
      cantidad_categoria_vendida: v.categoria.cantidad_categoria_vendida,
      total_vendido: v.dataValues.total_vendido
    }));
    res.json({ categorias: categoriasFront });
  } catch (error) {
    console.error("Error al obtener categorías más vendidas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
