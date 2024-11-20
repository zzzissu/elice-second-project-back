import userService from '../services/userService.js';
import { secretPassword, tokenUtil } from '../utils/authUtils.js'; // secretPassword와 tokenUtil 임포트
import asyncHandler from '../utils/asyncHandler.js';

const userController = {
    // 유저목록 조회
    userList: asyncHandler(async (req, res) => {
        const users = await userService.userList();
        res.status(200).json(users);
    }),
    // 이메일 중복 확인 API
    checkEmail: async (req, res, next) => {
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
            next(e);
        }
    },

    // 닉네임 중복 확인 API
    checkNickname: async (req, res, next) => {
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
            next(e);
        }
    },
    // 비밀번호 일치 확인 API
    checkPassword: async (req, res) => {
        try {
            const userId = req.user._id; // 로그인된 사용자 ID
            const { password } = req.body; // 입력된 비밀번호

            // 비밀번호 확인 서비스 호출
            const isMatch = await userService.checkPassword(userId, password);

            if (isMatch) {
                res.status(200).json({ message: '비밀번호가 일치합니다.' });
            } else {
                res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // 회원가입
    signUp: async (req, res, next) => {
        try {
            const { email, password, name, nickname, phone, address } = req.body;

            const user = await userService.signUp({ email, password, name, nickname, phone, address });

            res.status(201).json({ message: '회원가입이 완료되었습니다.', user });
        } catch (e) {
            next(e);
        }
    },

    // 로그인
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.signIn(email, password);
            // const isPasswordValid = await secretPassword.verifyPassword(password, user.password);

            // if (!isPasswordValid) throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');

            const token = tokenUtil.createToken(user);

            res.json({ message: '로그인 성공', user });
        } catch (e) {
            next(e);
        }
    },

    // 마이페이지 조회
    getProfile: async (req, res, next) => {
        try {
            const userId = req.user._id; // 로그인한 사용자의 ID
            const user = await userService.getProfile(userId); // 서비스에 userId 전달
            if (!user) {
                return res.status(404).json({ message: '유저 정보를 찾을 수 없습니다.' });
            }
            res.status(200).json(user); // 유저 정보 반환
        } catch (e) {
            next(e);
        }
    },

    // 마이페이지 수정
    updateProfile: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const updateData = req.body;
            const updatedUser = await userService.updateProfile(userId, updateData);

            res.status(204).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    // 회원 탈퇴
    deleteUser: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const result = await userService.deleteUser(userId);

            res.status(204).json(result);
        } catch (e) {
            next(e);
        }
    },
};

export default userController;
