require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 호출
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api 호출
app.use('/api/users', userRoutes);

// DB 연결
connectDB();

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
