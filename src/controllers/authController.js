const bcrypt = require('bcrypt');
const User = require('../models/user'); // User 모델

// 회원가입 컨트롤러
const signup = async (req, res) => {
  const { name, nickname, phone, email, password, address } = req.body;

  try {
    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '이메일이 이미 존재합니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    const newUser = new User({
      name,
      nickname,
      phone,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: '회원가입이 완료되었습니다!' });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
  }
};

module.exports = { signup };
