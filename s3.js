import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.REGION;
const accessKeyId = process.env.ACCESS;
const secretAccessKey = process.env.SECRET;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export default s3;
