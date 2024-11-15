import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sellerId: { type: String, required: true },
    state: {
        type: Boolean,
        required: true,
        default: false,
    },
    categoryId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
export default productSchema;
