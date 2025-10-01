const UserModel = require('../../infrastructure/database/UserModel');

class UserService {
  static async getAllUsers() {
    const users = await UserModel.find().select('-password');
    return users;
  }

  static async getUserById(id) {
    const user = await UserModel.findById(id).select('-password');
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }

  static async getUserProfile(id) {
    const user = await UserModel.findById(id).select('-password');
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
}

module.exports = UserService;