import mongoose from 'mongoose';
import productSchema from '../schema/productSchema.js';
import setProductMiddleware from '../middleware/productMiddleware.js';

setProductMiddleware(productSchema);

const Product = mongoose.model('Product', productSchema);

export default Product;
