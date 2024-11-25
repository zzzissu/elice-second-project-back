import s3 from '../config/aws.js'; // S3 클라이언트
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const fileController = {
    // 프로필 이미지 프리사인드 URL 생성
    generateProfilePresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body; // 클라이언트에서 파일 이름과 타입을 전달받음
        if (!fileName || !fileType) {
            return res.status(400).send('파일 이름과 타입이 필요합니다.');
        }

        try {
            const uniqueFileName = `profile/${Date.now()}_${fileName}`; // 고유 파일 이름
            const params = {
                Bucket: 'elice-project-oreore',
                Key: uniqueFileName,
                ContentType: fileType,
                ACL: 'public-read', // 퍼블릭 읽기 권한 설정
            };

            // 프리사인드 URL 생성
            const presignedUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
                expiresIn: 3600, // URL 유효기간 (1시간)
            });

            // S3 객체 URL 생성
            const s3ObjectUrl = `https://${params.Bucket}.s3.ap-northeast-2.amazonaws.com/${uniqueFileName}`;

            res.status(200).json({ presignedUrl, s3ObjectUrl });
        } catch (error) {
            console.error('프리사인드 URL 생성 실패:', error);
            res.status(500).send('프리사인드 URL 생성 실패');
        }
    },

    // 상품 이미지 프리사인드 URL 생성
    generateProductPresignedUrl: async (req, res) => {
        const { fileName, fileType } = req.body;
        if (!fileName || !fileType) {
            return res.status(400).send('파일 이름과 타입이 필요합니다.');
        }

        try {
            const uniqueFileName = `product/${Date.now()}_${fileName}`; // 고유 파일 이름
            const params = {
                Bucket: 'elice-project-oreore',
                Key: uniqueFileName,
                ContentType: fileType,
                ACL: 'public-read', // 퍼블릭 읽기 권한 설정
            };

            // 프리사인드 URL 생성
            const presignedUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
                expiresIn: 3600, // URL 유효기간 (1시간)
            });

            // S3 객체 URL 생성
            const s3ObjectUrl = `https://${params.Bucket}.s3.ap-northeast-2.amazonaws.com/${uniqueFileName}`;

            res.status(200).json({ presignedUrl, s3ObjectUrl });
        } catch (error) {
            console.error('프리사인드 URL 생성 실패:', error);
            res.status(500).send('프리사인드 URL 생성 실패');
        }
    },
};

export default fileController;
