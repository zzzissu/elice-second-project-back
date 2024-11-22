import mongoose from 'mongoose';
import paymentSchema from '../schema/paymentSchema.js';

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
