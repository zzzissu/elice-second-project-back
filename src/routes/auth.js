const express = require('express');
const { signup } = require('../controllers/authController'); // 컨트롤러 불러오기

const router = express.Router();

// 회원가입 라우트
router.post('/signup', signup);

module.exports = router;
