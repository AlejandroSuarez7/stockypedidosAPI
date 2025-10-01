const UserModel = require('../../infrastructure/database/UserModel');

class UserRepository {
  async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async findAll() {
    return await UserModel.find();
  }

  async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;