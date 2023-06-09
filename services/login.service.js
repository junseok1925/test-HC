const redis = require('redis');
const jwt = require('../utils/jwt.js');
const RedisRepository = require('../repositories/redis.repository.js');
require('dotenv').config();

class LoginService {
  redisRepository = new RedisRepository(redis);

  login = async (user) => {
    try {
      const accessToken = jwt.createAccessToken(
        user.user_id,
        user.nickname,
        user.email,
        user.major_id,
        user.authority,
        user.image
      );

      const refreshToken = jwt.createRefreshToken();

      const key = `refreshtoken:${user.user_id}`;
      const value = refreshToken;
      const expire_time = 86400;

      const getData_before = await this.redisRepository.getData(key);

      if (getData_before) {
        await this.redisRepository.deleteData(key);
      }

      await this.redisRepository.setData(key, value, expire_time);
      // 테스트용으로 refreshToken도 반환
      return [accessToken, refreshToken];
      // return accessToken;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  logout = async (user_id) => {
    try {
      const key = `refreshtoken:${user_id}`;
      return await this.redisRepository.deleteData(key);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  redis_save_email_auth_number = async (email, userNum, EXPIRE_TIME) => {
    try {
      return await this.redisRepository.setData(email, userNum, EXPIRE_TIME);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  redis_find_email_auth_number = async (email) => {
    try {
      return await this.redisRepository.getData(email);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = LoginService;
