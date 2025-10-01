const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, cancelOrder } = require('../controllers/orderController');
const authMiddleware = require('../../infrastructure/auth/authMiddleware');

router.use(authMiddleware);
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
