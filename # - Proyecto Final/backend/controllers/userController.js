const { User } = require('../models');

// Lo pide el front de fran y nico
exports.getAll = async (req, res) => {
    const users = await User.findAll();
    const usersFront = users.map(u => ({
        id: u.id,
        nombre: u.nombre,
        telefono: u.telefono,
        email: u.email
    }));
    res.json({ users: usersFront });
};

exports.create = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.json({ id: user.id, nombre: user.nombre, email: user.email });
};