import 'dotenv/config'; // dotenv 환경변수 설정
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import connectDB from './src/db/db.js'; // DB 연결 함수 임포트
import errorMiddleware from './src/middleware/errorMiddleware.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 호출

app.use(cors()); // CORS 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api 호출
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorMiddleware);

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
