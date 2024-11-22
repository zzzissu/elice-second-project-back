import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/aws.js'; // AWS S3 클라이언트를 가져옵니다.

// 폴더 이름에 맞는 multerS3 설정을 생성하는 함수
const createStorage = (folderName) => {
    return multerS3({
        s3: s3,
        bucket: 'elice-project-oreore', // S3 버킷 이름
        key: (req, file, cb) => {
            cb(null, `${folderName}/${Date.now()}_${file.originalname}`); // S3에 저장될 파일 이름
        },
    });
};

// 파일 업로드 미들웨어 객체 생성
const fileUploadMiddleware = {
    uploadProfileImage: multer({ storage: createStorage('profile') }), // 프로필 이미지 업로드
    uploadProductImage: multer({ storage: createStorage('product') }), // 상품 이미지 업로드
};

export default fileUploadMiddleware;
