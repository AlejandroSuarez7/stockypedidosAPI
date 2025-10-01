const UserService = require('../../application/usecases/userService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await UserService.getUserProfile(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController;