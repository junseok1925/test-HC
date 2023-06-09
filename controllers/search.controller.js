const SearchService = require('../services/search.service');

class SearchController {
  searchService = new SearchService();

  searchExams = async (req, res, next) => {
    try {
      const keyword = req.query.keyword; 
      if (!keyword) {
        return res.status(411).json({errMsg: '검색어를 입력해주세요'});
      }

      const results = await this.searchService.searchExams(keyword);
      return res.status(200).json({data: results});
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errMsg: '검색에 실패하였습니다. 다시 시도해주세요.' });
    }
  };
}

module.exports = SearchController;
