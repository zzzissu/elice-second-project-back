import { S3Client } from '@aws-sdk/client-s3'; // AWS SDK v3에서 가져올 S3Client
import dotenv from 'dotenv';

// 환경변수로 AWS 키 설정
dotenv.config();

// AWS S3 클라이언트 생성 (AWS SDK v3 사용)
const s3 = new S3Client({
    region: process.env.AWS_REGION, // AWS region 설정, 여기서는 ap-northeast-2
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key ID
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key
    },
    endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`, // 리전별 엔드포인트 설정
});

export default s3;
