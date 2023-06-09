const { Users } = require('../models');
const jwt = require('../utils/jwt.js');
const RedisRepository = require('../repositories/redis.repository.js');
const redis = require('redis');
const redisRepository = new RedisRepository(redis);
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    let accesstoken;
    if (req.cookies.accesstoken) {
      accesstoken = req.cookies.accesstoken;
    } else if (req.headers.accesstoken) {
      accesstoken = req.headers.accesstoken;
    } else {
      accesstoken = null;
    }

    // 엑세스 토큰 있니?
    if (!accesstoken) {
      return res.status(411).json({ errMsg: '값 없음: 엑세스 토큰' });
    }

    // 엑세스 토큰 타입 / 값 분류
    const [accTokenType, accTokenValue] = accesstoken.split(' ');

    // 엑세스 토큰 타입 Bearer 맞니?
    if (accTokenType !== 'Bearer') {
      return res.status(412).json({ errMsg: '형식 불량: 엑세스 토큰 타입' });
    }
    // 엑세스 토큰 값 있니?
    if (!accTokenValue) {
      return res.status(412).json({ errMsg: '형식 불량: 엑세스 토큰 값' });
    }

    // 엑세스 토큰 jwt.verify
    const verifyAccessTokenValue = jwt.validateTokenValue(accTokenValue);

    // 리프레시 토큰 있니? (유효기간 만료 시, 없음)
    const refreshTokenKey = `refreshtoken:${verifyAccessTokenValue.user_id}`;
    const refreshToken = await redisRepository.getData(refreshTokenKey);
    if (!refreshToken) {
      console.log(refreshToken);
      return res.status(411).json({ errMsg: '값 없음: 리프레시 토큰' });
    }

    // 엑세스 토큰 값 만료 됬구나!
    let newAccessToken;
    if (verifyAccessTokenValue.result === false) {
      // 새 엑세스 토큰 만들어줄게
      newAccessToken = jwt.createAccessToken(
        verifyAccessTokenValue.user_id,
        verifyAccessTokenValue.nickname,
        verifyAccessTokenValue.email,
        verifyAccessTokenValue.major_id,
        verifyAccessTokenValue.authority,
        verifyAccessTokenValue.image
      );

      // 쿠키도 다시 담아줄게
      res.clearCookie('accesstoken');
      res.cookie('accesstoken', `Bearer ${newAccessToken}`);

      console.log('엑세스 토큰 다시 만들었습니다.');
    }

    // 엑세스 토큰 값 정상 이구나!

    // res.locals.user 유저정보 할당
    res.locals.user = {
      accesstoken: newAccessToken,
      result: verifyAccessTokenValue.result,
      user_id: verifyAccessTokenValue.user_id,
      nickname: verifyAccessTokenValue.nickname,
      email: verifyAccessTokenValue.email,
      major_id: verifyAccessTokenValue.major_id,
      authority: verifyAccessTokenValue.authority,
      image: verifyAccessTokenValue.image,
    };

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};