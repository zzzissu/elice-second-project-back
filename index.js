require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user'); // User 모델 불러오기

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  
  // 테스트 유저 생성 및 저장
  const testUser = new User({
    name: "hanj",
    nickname: "Tester",
    phone: "123-456-7890",
    email: "hanjs@example.com",
    password: "securepassword",
    address: "123 Test Street",
  });

  testUser.save()
    .then(user => console.log("테스트 유저가 성공적으로 저장되었습니다:", user))
    .catch(error => console.error("테스트 유저 저장 중 오류:", error));
})
.catch((err) => console.error(err));

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
