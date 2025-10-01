const OrderDetailModel = require('../../infrastructure/database/OrderDetailModel');

class OrderDetailRepository {
  async create(orderDetailData) {
    const orderDetail = new OrderDetailModel(orderDetailData);
    return await orderDetail.save();
  }

  async findById(id) {
    return await OrderDetailModel.findById(id)
      .populate('pedidoId')
      .populate('productoId');
  }

  async findByOrderId(pedidoId) {
    return await OrderDetailModel.find({ pedidoId })
      .populate('productoId');
  }

  async findAll() {
    return await OrderDetailModel.find()
      .populate('pedidoId')
      .populate('productoId');
  }

  async update(id, orderDetailData) {
    return await OrderDetailModel.findByIdAndUpdate(id, orderDetailData, { new: true });
  }

  async delete(id) {
    return await OrderDetailModel.findByIdAndDelete(id);
  }

  async deleteByOrderId(pedidoId) {
    return await OrderDetailModel.deleteMany({ pedidoId });
  }
}

module.exports = OrderDetailRepository;