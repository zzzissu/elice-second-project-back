import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

const userService = {
    //유저 조회
    userList: async () => {
        try {
            // 탈퇴하지 않은 유저만 조회
            const users = await User.find({ deletedAt: null }).sort({ createdAt: -1 });
            return users;
        } catch (e) {
            throw new Error('유저 목록 조회에 실패했습니다.');
        }
    },
    // 회원 생성(가입)
    signUp: async (user) => {
        const { email, password, name, nickname, phone, postalCode, basicAdd, detailAdd } = user;

        // 이메일 중복 확인
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('이미 사용 중인 이메일입니다.');
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성 및 저장
        const newUser = new User({
            name,
            nickname,
            phone,
            email,
            password: hashedPassword,
            postalCode,
            basicAdd,
            detailAdd,
        });

        return await newUser.save();
    },

    // 로그인
    signIn: async (email, password) => {
        // 유저 정보 확인(이메일)
        const user = await User.findOne({ email, deletedAt: null });
        if (!user) {
            throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
        }
        //console.log(user.password);
        // 유저 정보 확인(비밀번호)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
        }
        //console.log(JWT_SECRET);
        // 토큰 생성
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return { user, token };
    },

    // 유저정보 조회
    getProfile: async (userId) => {
        const user = await User.findOne({ _id: userId, deletedAt: null }).select('-password -deletedAt'); // 비밀번호와 삭제 날짜 제외

        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }
        return user;
    },

    // 유저정보 수정
    updateProfile: async (userId, updateData) => {
        const { phone, postalCode, basicAdd, detailAdd } = updateData;
        const user = await User.findOneAndUpdate(
            { _id: userId, deletedAt: null },
            { phone, postalCode, basicAdd, detailAdd, updatedAt: Date.now() },
            { new: true }
        ).select('-password -deletedAt'); // 비밀번호와 삭제 날짜 제외

        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }
        return user;
    },

    // 회원 탈퇴
    deleteUser: async (userId) => {
        const user = await User.findOneAndUpdate({ _id: userId }, { deletedAt: Date.now() }, { new: true });

        if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }
        return { message: '회원 탈퇴가 완료되었습니다.', user };
    },
};

export default userService;
