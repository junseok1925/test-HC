const { Users } = require('../models');

class UserRepository {
  emailExists = async (email) => {
    try {
      return await Users.findOne({ where: { email } });
    } catch (err) {
      console.error(err);
    }
  };

  nicknameExists = async (nickname) => {
    try {
      return await Users.findOne({ where: { nickname } });
    } catch (err) {
      console.error(err);
    }
  };

  signup = async (userData) => {
    try {
      return await Users.create({
        email: userData.email,
        nickname: userData.nickname,
        password: userData.password,
        image: userData.image,
        major_id: userData.major_id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  withdrawal = async (user_id) => {
    try {
      return await Users.destroy({ where: { user_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getProfile = async (user_id) => {
    try {
      return await Users.findOne({
        attributes: ['user_id', 'email', 'nickname', 'image', 'authority', 'major_id', 'createdAt', 'updatedAt'],
        where: { user_id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateProfile = async (userData) => {
    try {
      return await Users.update(
        {
          email: userData.email,
          nickname: userData.nickname,
          password: userData.password,
          image: userData.image,
          authority: userData.authority,
          major_id: userData.major_id,
        },
        { where: { user_id: userData.user_id } }
      );
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserRepository;
