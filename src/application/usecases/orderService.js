const OrderModel = require('../../infrastructure/database/OrderModel');
const OrderDetailModel = require('../../infrastructure/database/OrderDetailModel');
const ProductModel = require('../../infrastructure/database/ProductModel');

class OrderService {
  static async createOrder({ usuarioId, detalles }) {
    // detalles: [{ productoId, cantidad }]
    let total = 0;
    const session = await OrderModel.startSession();
    session.startTransaction();
    try {
      // Verificar stock y calcular total
      for (const item of detalles) {
        const producto = await ProductModel.findById(item.productoId).session(session);
        if (!producto || producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto ${item.productoId}`);
        }
        total += producto.precio * item.cantidad;
      }
      // Crear pedido
      const order = new OrderModel({ usuarioId, total, estado: 'activo' });
      await order.save({ session });
      // Crear detalles y descontar stock
      for (const item of detalles) {
        const producto = await ProductModel.findById(item.productoId).session(session);
        producto.stock -= item.cantidad;
        await producto.save({ session });
        await OrderDetailModel.create([{
          pedidoId: order._id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
          subtotal: producto.precio * item.cantidad
        }], { session });
      }
      await session.commitTransaction();
      session.endSession();
      return order;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  static async getAllOrders() {
    return OrderModel.find();
  }

  static async getOrderById(id) {
    const order = await OrderModel.findById(id);
    const detalles = await OrderDetailModel.find({ pedidoId: id });
    return { order, detalles };
  }

  static async cancelOrder(id) {
    const order = await OrderModel.findById(id);
    if (!order || order.estado === 'cancelado') throw new Error('Pedido no encontrado o ya cancelado');
    const detalles = await OrderDetailModel.find({ pedidoId: id });
    const session = await OrderModel.startSession();
    session.startTransaction();
    try {
      // Devolver stock
      for (const item of detalles) {
        const producto = await ProductModel.findById(item.productoId).session(session);
        producto.stock += item.cantidad;
        await producto.save({ session });
      }
      order.estado = 'cancelado';
      await order.save({ session });
      await session.commitTransaction();
      session.endSession();
      return order;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}

module.exports = OrderService;
