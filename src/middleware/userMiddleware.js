import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const setUserMiddleware = (userSchema) => {
    userSchema.pre('save', async function (next) {
        if (this.isNew) {
            try {
                const plainId = new mongoose.Types.ObjectId().toString();
                const salt = await bcrypt.genSalt(10);
                this.id = await bcrypt.hash(plainId, salt);
            } catch (e) {
                return next(e);
            }
        }
        this.updatedAt = Date.now();
        next();
    });
};

export default setUserMiddleware;
