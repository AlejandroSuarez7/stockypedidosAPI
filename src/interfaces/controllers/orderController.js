const OrderService = require('../../application/usecases/orderService');

const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder({ usuarioId: req.user.id, detalles: req.body.detalles });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await OrderService.getAllOrders();
  res.json(orders);
};

const getOrderById = async (req, res) => {
  try {
    const result = await OrderService.getOrderById(req.params.id);
    if (!result.order) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await OrderService.cancelOrder(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, cancelOrder };
