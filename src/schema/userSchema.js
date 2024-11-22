import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },

    postalCode: { type: String, required: true },
    basicAdd: { type: String, required: true },
    detailAdd: { type: String, required: false },

    deletedAt: { type: Date, default: null },
}, {
    timestamps: true
});

export default userSchema;
