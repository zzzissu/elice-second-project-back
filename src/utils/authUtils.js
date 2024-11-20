import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../class/errorClass.js'

export const secretPassword = {
  // 비밀번호 암호화
  hashPassword: async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  },

  // 비밀번호 검증
  verifyPassword: async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }
};

export const tokenUtil = {
  // 토큰 생성
  createToken: (userData) => {
    const payload = {
      id: userData.id,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });
    return token;
  },

  // 토큰 검증
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (e) {
      throw new UnauthorizedError('토큰이 유효하지 않습니다.');
    }
  }
};