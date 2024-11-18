import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    soldOut: {
        type: Boolean,
        default: false,
    },
    categoryName: {
        type: String,
        enum: ['audio devices', 'cameras', 'typewriters', 'mobile phones', 'display devices'],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
export default productSchema;
