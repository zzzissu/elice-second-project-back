import { tokenUtil } from '../utils/authUtils.js';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'에서 토큰만 추출

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    try {
        const decoded = tokenUtil.verifyToken(token); // 토큰 검증
        req.user = { _id: decoded.userId, email: decoded.email }; // userId를 _id로 변환하여 설정
        //console.log('Authenticated User:', req.user); // 추가된 로그로 확인
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

export default authenticate; // default export 추가
