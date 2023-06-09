
const multer = require('multer');

errorHandler = async (err, req, res, next) => {
  const { statusCode, responseMsg, failedMsg } = err;
  console.error(err);

  // 허용된(25MB)이상의 img파일을 올리면 생기는 multer-S3 오류헨들러 
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(412).json({ errMsg: '25MB 이하의 사진만 설정 할 수 있습니다.' });
    } else {
      return res.status(400).json({ errMsg: '다시 시도해주십시오.' });
    }
  } 

  if (statusCode) {
    return res.status(statusCode).json({ errMsg: responseMsg });
  } else {
    return res.status(400).json({ errMsg: `${failedMsg}` });
  }
};

module.exports = errorHandler;
