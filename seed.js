// seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user'); // User 모델 가져오기
const connectDB = require('./src/db/db'); // MongoDB 연결 모듈 가져오기

const seedUsers = async () => {
  try {
    await connectDB();
    
    // 임시 유저 데이터 생성
    const testUser = new User({
      name: "user1",
      nickname: "Tester1",
      phone: "123-456-7890",
      email: "user1@example.com",
      password: "pw",
      address: "123 Test Street",
    });
    
    await testUser.save();
    console.log("테스트 유저가 성공적으로 저장되었습니다:", testUser);

    mongoose.connection.close(); // 데이터베이스 연결 종료
  } catch (error) {
    console.error("테스트 유저 생성 중 오류:", error);
    mongoose.connection.close();
  }
};

seedUsers();