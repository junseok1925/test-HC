const { Op } = require('sequelize'); //Sequelize 라이브러리에서 Op 연산자를 가져온다
const { Exams } = require('../models');

class SearchRepository {
    searchExams = async (keyword) => {
        try {
          // 모든 레코드 검색
          const results = await Exams.findAll({
            where: {
              [Op.or]: [ //두 개 이상의 조건 중 하나 이상이 참일 때 레코드를 반환
                { certificate_name: { [Op.like]: `%${keyword}%` } }, // keyword를 포함하는 레코드를 찾는다.
                { subject_name: { [Op.like]: `%${keyword}%` } },    // keyword를 포함하는 레코드를 찾는다.
              ],
            },
          });
          return results;
        } catch (err) {
          console.error(err);
        }
      };
      
}
// searchExams = async (keyword) => {
//     const searchData = await this.Exams.findAll({
//       where: {
//         [Op.or]: [
//           {
//             certificate_name: {
//               [Op.like]: `%${keyword}%`,
//             },
//           },
//           {
//             subject_name: {
//               [Op.like]: `%${keyword}%`,
//             },
//           },
//         ],
//       },
//       attributes: ['certificate_name', 'subject_name'],
//     });
//     return searchData;
// };



module.exports = SearchRepository;
