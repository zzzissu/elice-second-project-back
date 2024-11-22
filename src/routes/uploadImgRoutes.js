import express from "express";
import uploadImg from "../middleware/multerMiddleware";
import AWS from "aws-sdk";
import dotenv from "dotenv";

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

router.get("/");

const getPresignedUrl = (fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: "image/jpg",
  };

  const url = s3.getSignedUrlPromise("putObject", params);
};

export default router;
