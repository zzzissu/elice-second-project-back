const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const setUserMiddleware = require('../middleware/userMiddleware');

setUserMiddleware(userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
