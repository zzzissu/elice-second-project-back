const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  nickname: {
    type: String,
    required: true,
    maxlength: 20
  },
  phone: {
    type: String,
    required: true,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    maxlength: 15
  },
  address: {
    type: String,
    required: true,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

// id 생성 및 암호화
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const plainId = new mongoose.Types.ObjectId().toString(); // 기본 ObjectId 생성
      const salt = await bcrypt.genSalt(10);
      this.id = await bcrypt.hash(plainId, salt); // id 암호화
    } catch (error) {
      return next(error);
    }
  }
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
