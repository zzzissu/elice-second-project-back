import mongoose from 'mongoose';
import orderSchema from '../schema/orderSchema.js';
import updateProductSoldOut from '../middleware/orderMiddleware.js';

updateProductSoldOut(orderSchema);

const Order = mongoose.model('Order', orderSchema);

export default Order;
