const AWS = require('aws-sdk');
const { request } = require('http');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const path = require('path');
require('dotenv').config(); // 환경변수 사용

// S3클래스를 이용해서 S3 서비스에 대한 새로운 인스턴스 생성
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// 허용할 파일 확장자
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// 현재 날짜와 시간
const getToDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
};

// 랜덤한 4자리 숫자
const getRandomNum = () => {
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += String(Math.floor(Math.random() * 10));
  }
  return result;
};

const upload_image = multer({
  storage: multerS3({
    s3: s3, // s3객체 S3와 상호작용
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 업로드되는 파일의 MIME type을 자동으로 설정

    // S3에 저장될 때 사용할 파일명을 설정
    key: (req, file, callback) => {
      const today = getToDate();
      const randomNum = getRandomNum();
      // from 데이터로 받은파일의 확장자를 추출
      const extension = path.extname(file.originalname).toLowerCase();

      // 허용한 확장자인지 검증
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('확장자 에러')); //412
      }
      // 파일이 업로드된 시간(date), 랜덤한 네 자리 숫자(randomNumber)를 결함하려 고유한이름을 가진 파일의 url를 생성
      const img_url = `https://${process.env.AWS_BUCKET}.s3.ap-northeast-2.amazonaws.com/img/${today}_${randomNum}${extension}`;

      // 생성된 img_url을 req.img_url에 배열 형태로 담음
      req.img_url = req.img_url || [];
      // img_url 값을 req.img_url 배열에 추가(push)
      req.img_url.push(img_url);
      callback(null, `img/${today}_${randomNum}${extension}`);
    },
    // AWS S3에서 액세스 제어 목록 (ACL)을 설정 이 경우 "public-read"는 파일이 공개적으로 읽을 수 있음을 의미 즉, 인터넷 상의 모든 사람이 해당 파일을 읽을 수 있다.
    acl: 'public-read',
  }),
  // 업로드 가능한 파일의 최대 크기를 제한한다 여기서 25MB로 설정, 이 한도를 초과하면 업로드를 거부
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
module.exports = upload_image;
