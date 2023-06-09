const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME;
const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME;

module.exports = {
  // Access Token 발급
  createAccessToken: (user_id, nickname, email, major_id, authority, image) => {
    return jwt.sign(
      { user_id, nickname, email, major_id, authority, image },
      SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRE_TIME }
    );
  },

  // Refresh Token 발급
  createRefreshToken: (user_id) => {
    return jwt.sign({ user_id }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRE_TIME });
  },

  // Token Type 검증 ( Bearer인지 확인함)
  validateTokenType: (tokenType) => {
    return tokenType === 'Bearer';
  },

  // Token Value 검증 : verify는 검증실패 시, 에러를 발생시킴
  // 검증 성공시 토큰의 payload를 리턴한다
  validateTokenValue: (tokenValue) => {
    try {
      return jwt.verify(tokenValue, SECRET_KEY);
    } catch (error) {
      return false;
    }
  },

  // AccessToken에 암호화된 Payload 가져오기
  getTokenPayload: (tokenValue) => {
    try {
      return jwt.verify(tokenValue, SECRET_KEY);
    } catch (error) {
      return null;
    }
  },
};
