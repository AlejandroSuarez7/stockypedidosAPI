const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);