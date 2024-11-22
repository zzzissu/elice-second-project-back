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
        enum: ['audio', 'camera', 'typewriter', 'phone', 'display'],
        required: true,
    },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true
});
export default productSchema;
