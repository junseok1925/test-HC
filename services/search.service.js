const SearchRepository = require('../repositories/search.repository');

class SearchService {
  searchRepository = new SearchRepository();

  searchExams = async (keyword) => {
    try {
      const results = await this.searchRepository.searchExams(keyword);

      if (!results.length) {
        return [];
      }

      return results
        .map((result) => {
          // certificate_name 혹은 subject_name에 keyword가 포함된 결과만 반환해보리기
          if (result.certificate_name.includes(keyword) || result.subject_name.includes(keyword)) {
            return {
              // 일단 모든 데이터를 반환해보리기
              exam_id: result.exam_id,
              major_id: result.major_id,
              major_name: result.major_name,
              year: result.year,
              round: result.round,
              certificate_division: result.certificate_division,
              certificate_id: result.certificate_id,
              certificate_name: result.certificate_name,
              subject_id: result.subject_id,
              subject_name: result.subject_name,
            };
          }
        })
        // .filter(Boolean) // 0,false, NaN한 레코드 삭제
        .sort((a, b) => {
          // 먼저 year에 따라 정렬
          // year 2023 ~ 2020
          if (a.year !== b.year) {
            return b.year - a.year; // 내림차순
          }
          // year가 같으면 round에 따라 정렬
          // round 1 ~ 4
          return a.round - b.round; // 오름차순
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = SearchService;
