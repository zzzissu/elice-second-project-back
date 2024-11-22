import { Upload } from '@aws-sdk/lib-storage'; // Upload 임포트
import s3 from '../config/aws.js'; // S3 클라이언트 임포트
import stream from 'stream'; // Node.js stream 모듈 임포트

const fileController = {
    profileFile: async (req, res) => {
        if (!req.file) {
            return res.status(400).send('파일이 없습니다.');
        }

        try {
            // 스트림을 만들어서 버퍼를 스트림으로 변환
            const bufferStream = new stream.PassThrough();
            bufferStream.end(req.file.buffer); // 버퍼를 스트림에 전달

            const uploadParams = {
                Bucket: 'elice-project-oreore', // S3 버킷 이름
                Key: `profile/${Date.now()}_${req.file.originalname}`, // S3에 저장될 파일 이름
                Body: bufferStream, // 스트림을 Body로 전달
            };

            // Upload 클래스를 사용하여 멀티파트 업로드
            const upload = new Upload({
                client: s3,
                params: uploadParams,
            });

            await upload.done(); // 업로드 완료
            res.status(200).json({
                message: '파일 업로드 성공',
                file: req.file, // 업로드된 파일 정보
            });
        } catch (error) {
            res.status(500).send('파일 업로드 실패');
            console.error(error);
        }
    },

    productFile: async (req, res) => {
        if (!req.file) {
            return res.status(400).send('파일이 없습니다.');
        }

        try {
            // 스트림을 만들어서 버퍼를 스트림으로 변환
            const bufferStream = new stream.PassThrough();
            bufferStream.end(req.file.buffer); // 버퍼를 스트림에 전달

            const uploadParams = {
                Bucket: 'elice-project-oreore', // S3 버킷 이름
                Key: `product/${Date.now()}_${req.file.originalname}`, // S3에 저장될 파일 이름
                Body: bufferStream, // 스트림을 Body로 전달
            };

            // Upload 클래스를 사용하여 멀티파트 업로드
            const upload = new Upload({
                client: s3,
                params: uploadParams,
            });

            await upload.done(); // 업로드 완료
            res.status(200).json({
                message: '파일 업로드 성공',
                file: req.file, // 업로드된 파일 정보
            });
        } catch (error) {
            res.status(500).send('파일 업로드 실패');
            console.error(error);
        }
    },
};

export default fileController;
