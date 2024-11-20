import userService from '../services/userService.js';
import { secretPassword, tokenUtil } from '../utils/authUtils.js'; // secretPassword와 tokenUtil 임포트
import asyncHandler from '../utils/asyncHandler.js';

const userController = {
    // 유저 목록 조회
    userList: asyncHandler(async (req, res, next) => {
        const users = await userService.userList();
        res.status(200).json(users);
    }),

    // 이메일 중복 확인
    checkEmail: asyncHandler(async (req, res, next) => {
        const { email } = req.body;
        const result = await userService.checkEmail(email);
        res.status(200).json(result);
    }),

    // 닉네임 중복 확인
    checkNickname: asyncHandler(async (req, res, next) => {
        const { nickname } = req.body;
        const result = await userService.checkNickname(nickname);
        res.status(200).json(result);
    }),

    // 비밀번호 일치 확인
    checkPassword: asyncHandler(async (req, res, next) => {
        const userId = req.user._id;
        const { password } = req.body;
        const result = await userService.checkPassword(userId, password);
        res.status(200).json(result);
    }),

    // 회원가입
    signUp: asyncHandler(async (req, res, next) => {
        const user = await userService.signUp(req.body);
        res.status(201).json({ message: '회원가입이 완료되었습니다.', user });
    }),

    // 로그인
    signIn: asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const { user, token } = await userService.signIn(email, password);
        res.status(200).json({ message: '로그인 성공', user, token });
    }),

    // 마이페이지 조회
    getProfile: asyncHandler(async (req, res, next) => {
        const userId = req.user._id;
        const user = await userService.getProfile(userId);
        res.status(200).json(user);
    }),

    // 마이페이지 수정
    updateProfile: asyncHandler(async (req, res, next) => {
        const userId = req.user._id;
        const updatedUser = await userService.updateProfile(userId, req.body);
        res.status(200).json(updatedUser);
    }),

    // 회원 탈퇴
    deleteUser: asyncHandler(async (req, res, next) => {
        const userId = req.user._id;
        const result = await userService.deleteUser(userId);
        res.status(204).json(result);
    }),
};

export default userController;
