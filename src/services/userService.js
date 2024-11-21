import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { NotFoundError, UnauthorizedError, ConflictError } from '../class/errorClass.js';
import { tokenUtil } from '../utils/authUtils.js';

const userService = {
    // 유저 목록 조회
    userList: async (page, limit) => {
        const skip = (page - 1) * limit; // 스킵할 데이터 수 계산
        const users = await User.find({ deletedAt: null }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        if (!users) throw new NotFoundError('유저 목록을 찾을 수 없습니다.');

        const totalUsers = await User.countDocuments({ deletedAt: null });
        const totalPages = Math.ceil(totalUsers / limit);

        return { users, totalPages, currentPage: page };
    },

    // 이메일 중복 확인
    checkEmail: async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ConflictError('이미 사용 중인 이메일입니다.');
        }
        return { valid: true, message: '사용 가능한 이메일입니다.' };
    },

    // 닉네임 중복 확인
    checkNickname: async (nickname) => {
        const existingUser = await User.findOne({ nickname });
        if (existingUser) {
            throw new ConflictError('이미 사용 중인 닉네임입니다.');
        }
        return { valid: true, message: '사용 가능한 닉네임입니다.' };
    },

    // 비밀번호 일치 확인
    checkPassword: async (userId, password) => {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('사용자를 찾을 수 없습니다.');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedError('비밀번호가 일치하지 않습니다.');
        }
        return { valid: true, message: '비밀번호가 일치합니다.' };
    },

    // 회원가입
    signUp: async (user) => {
        const { email, password, name, nickname, phone, postalCode, basicAdd, detailAdd } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            nickname,
            phone,
            postalCode,
            basicAdd,
            detailAdd,
        });
        return await newUser.save();
    },

    // 로그인
    signIn: async (email, password) => {
        const user = await User.findOne({ email, deletedAt: null });
        if (!user) throw new UnauthorizedError('이메일 또는 비밀번호가 잘못되었습니다.');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedError('이메일 또는 비밀번호가 잘못되었습니다.');
        const token = tokenUtil.createToken(user);
        return { user, token };
    },

    // 마이페이지 조회
    getProfile: async (userId) => {
        const user = await User.findOne({ _id: userId, deletedAt: null }).select('-password -deletedAt');
        if (!user) throw new NotFoundError('유저 정보를 찾을 수 없습니다.');
        return user;
    },

    // 마이페이지 수정
    updateProfile: async (userId, updateData) => {
        const { phone, image, postalCode, basicAdd, detailAdd } = updateData;
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, deletedAt: null },
            { phone, image, postalCode, basicAdd, detailAdd, updatedAt: Date.now() },
            { new: true }
        ).select('-password -deletedAt');
        console.log(updateData);
        console.log(updatedUser);
        if (!updatedUser) throw new NotFoundError('사용자를 찾을 수 없습니다.');
        return updatedUser;
    },

    // 회원 탈퇴
    deleteUser: async (userId) => {
        const user = await User.findOneAndUpdate({ _id: userId }, { deletedAt: Date.now() }, { new: true });
        if (!user) throw new NotFoundError('사용자를 찾을 수 없습니다.');
        return { message: '회원 탈퇴가 완료되었습니다.', user };
    },
};

export default userService;
