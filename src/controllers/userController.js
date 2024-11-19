import userService from '../services/userService.js';
import { secretPassword, tokenUtil } from '../utils/authUtils.js'; // secretPassword와 tokenUtil 임포트

const userController = {
    // 유저목록 조회
    userList: async (req, res) => {
        try {
            const users = await userService.userList();
            res.status(200).json(users);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    // 이메일 중복 확인 API
    checkEmail: async (req, res) => {
        try {
            const { email } = req.body; // 쿼리 파라미터에서 이메일 추출
            if (!email) {
                return res.status(400).json({ message: '이메일을 입력해주세요.' });
            }
            const isDuplicate = await userService.checkEmail(email);
            if (isDuplicate) {
                return res.status(409).json({ valid: false, message: '이미 사용 중인 이메일입니다.' });
            }
            res.status(200).json({ valid: true, message: '사용 가능한 이메일입니다.' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    // 닉네임 중복 확인 API
    checkNickname: async (req, res) => {
        try {
            const { nickname } = req.body; // 쿼리 파라미터에서 닉네임 추출
            if (!nickname) {
                return res.status(400).json({ message: '닉네임을 입력해주세요.' });
            }
            const isDuplicate = await userService.checkNickname(nickname);
            if (isDuplicate) {
                return res.status(409).json({ valid: false, message: '이미 사용 중인 닉네임입니다.' });
            }
            res.status(200).json({ valid: true, message: '사용 가능한 닉네임입니다.' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
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

            res.json({ message: '로그인 성공', user });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: e.message });
        }
    },

    // 마이페이지 조회
    getProfile: async (req, res) => {
        try {
            const userId = req.user._id; // 로그인한 사용자의 ID
            const user = await userService.getProfile(userId); // 서비스에 userId 전달
            if (!user) {
                return res.status(404).json({ message: '유저 정보를 찾을 수 없습니다.' });
            }
            res.status(200).json(user); // 유저 정보 반환
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // 마이페이지 수정
    updateProfile: async (req, res) => {
        try {
            const userId = req.user._id;
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
            const userId = req.user._id;
            const result = await userService.deleteUser(userId);

            res.json(result);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default userController;
