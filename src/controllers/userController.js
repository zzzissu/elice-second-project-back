import userService from '../services/userService.js';
import { secretPassword, tokenUtil } from '../utils/authUtils.js'; // secretPassword와 tokenUtil 임포트

const userController = {
    // 회원가입
    signUp: async (req, res) => {
        try {
            const { email, password, name, nickname, phone, address } = req.body;

            const user = await userService.signUp({ email, password, name, nickname, phone, address });

            res.status(201).json({ message: '회원가입이 완료되었습니다.', user });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // 로그인
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.signIn(email, password);
            // const isPasswordValid = await secretPassword.verifyPassword(password, user.password);

            // if (!isPasswordValid) throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');

            const token = tokenUtil.createToken(user);

            res.json({ message: '로그인 성공', token, user });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
        }
    },

    // 마이페이지 조회
    getProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.getProfile(userId);

            res.json(user);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    },

    // 마이페이지 수정
    updateProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const updateData = req.body;
            const updatedUser = await userService.updateProfile(userId, updateData);

            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // 회원 탈퇴
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await userService.deleteUser(userId);

            res.json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default userController;
