const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../infrastructure/database/UserModel');

class AuthService {
  static async register({ nombre, email, password, rol }) {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error('El correo ya está registrado');
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({ nombre, email, password: hash, rol });
    await user.save();
    return user;
  }

  static async login({ email, password }) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Credenciales inválidas');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Credenciales inválidas');
    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, user };
  }
}

module.exports = AuthService;
