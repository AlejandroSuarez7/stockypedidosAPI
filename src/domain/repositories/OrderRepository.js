const OrderModel = require('../../infrastructure/database/OrderModel');

class OrderRepository {
  async create(orderData) {
    const order = new OrderModel(orderData);
    return await order.save();
  }

  async findById(id) {
    return await OrderModel.findById(id).populate('usuarioId');
  }

  async findAll() {
    return await OrderModel.find().populate('usuarioId');
  }

  async findByUserId(usuarioId) {
    return await OrderModel.find({ usuarioId }).populate('usuarioId');
  }

  async update(id, orderData) {
    return await OrderModel.findByIdAndUpdate(id, orderData, { new: true });
  }

  async delete(id) {
    return await OrderModel.findByIdAndDelete(id);
  }

  async updateStatus(id, estado) {
    return await OrderModel.findByIdAndUpdate(id, { estado }, { new: true });
  }
}

module.exports = OrderRepository;