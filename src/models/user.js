import mongoose from 'mongoose';
import userSchema from '../schema/userSchema.js';
import setUserMiddleware from '../middleware/userMiddleware.js';

setUserMiddleware(userSchema);

const User = mongoose.model('User', userSchema);

export default User;
