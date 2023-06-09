const ExaminfoService = require('../services/examinfo.service.js');

class ExaminfoController {
  examinfoService = new ExaminfoService();

  // ==================================== 전공 ====================================

  addMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { name } = req.body;
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });

      const addMajor = await this.examinfoService.addMajor(name);
      if (addMajor) {
        return res.status(200).json({ msg: '전공 등록 완료' });
      } else {
        return res.status(419).json({ errMsg: '전공 등록 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getMajors = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const getMajors = await this.examinfoService.getMajors();
      if (getMajors.length > 0) {
        return res.status(200).json({ data: getMajors });
      } else {
        return res.status(419).json({ errMsg: '전공 조회 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getOneMajor = async (req, res) => {
    try {
      const { major_id } = req.params;
      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      const getMajorData = await this.examinfoService.getOneMajor(major_id);
      if (getMajorData) {
        return res.status(200).json({ data: getMajorData });
      } else {
        return res.status(419).json({ errMsg: '요청한 전공 조회 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id } = req.params;
      const { name } = req.body;

      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });

      const updateMajor = await this.examinfoService.updateMajor(major_id, name);

      if (updateMajor) {
        return res.status(200).json({ msg: '전공 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '전공 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  dropMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id } = req.params;

      const dropResult = await this.examinfoService.dropMajor(major_id);

      if (dropResult) {
        return res.status(200).json({ msg: '전공 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '전공 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  // ==================================== 자격증 ====================================

  addCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id, name, division } = req.body;

      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });
      if (!division) return res.status(411).json({ errMsg: '값 없음: division' });

      const setCertificate = await this.examinfoService.addCertificate(major_id, name, division);

      if (setCertificate) {
        return res.status(200).json({ msg: '자격증 등록 완료' });
      } else {
        return res.status(419).json({ errMsg: '자격증 등록 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const getCertificates = await this.examinfoService.getCertificate();

      if (getCertificates.length === 0) {
        return res.status(419).json({ errMsg: '자격증 조회 실패' });
      } else {
        return res.status(200).json({ data: getCertificates });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getCertificateWithMajorId = async (req, res) => {
    try {
      const { major_id } = req.params;

      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });

      const getCertificatesData = await this.examinfoService.getCertificateWithMajorId(major_id);

      if (getCertificatesData.length === 0) {
        return res.status(419).json({ errMsg: '요청 전공 자격증 조회 실패' });
      } else {
        return res.status(200).json({ data: getCertificatesData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getCertificateWithCertificateId = async (req, res) => {
    try {
      const { certificate_id } = req.params;

      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });

      const getCertificatesData = await this.examinfoService.getCertificateWithCertificateId(certificate_id);

      if (!getCertificatesData) {
        return res.status(419).json({ errMsg: '요청 자격증 조회 실패' });
      } else {
        return res.status(200).json({ data: getCertificatesData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id } = req.params;
      const { major_id, name, division } = req.body;

      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });
      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });
      if (!division) return res.status(411).json({ errMsg: '값 없음: division' });

      const updateResult = await this.examinfoService.updateCertificate(certificate_id, major_id, name, division);

      if (updateResult) {
        return res.status(200).json({ msg: '자격증 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '자격증 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  dropCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id } = req.params;

      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });

      const dropResult = await this.examinfoService.dropCertificate(certificate_id);

      if (dropResult) {
        return res.status(200).json({ msg: '자격증 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '자격증 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  // ==================================== 과목 ====================================

  addSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id, name } = req.body;

      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });

      const setSubject = await this.examinfoService.addSubject(certificate_id, name);

      if (!setSubject) {
        return res.status(419).json({ errMsg: '과목 등록 실패' });
      } else {
        return res.status(200).json({ msg: '과목 등록 완료' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const subjectData = await this.examinfoService.getSubject();

      if (subjectData.length === 0) {
        return res.status(419).json({ errMsg: '과목 전체 조회 실패' });
      } else {
        return res.status(200).json({ data: subjectData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getSubjectWithCertificateId = async (req, res) => {
    try {
      const { certificate_id } = req.params;

      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });

      const getSubjectsData = await this.examinfoService.getSubjectWithCertificateId(certificate_id);
      if (getSubjectsData.length === 0) {
        return res.status(419).json({ errMsg: '요청 자격증 과목 조회 실패' });
      } else {
        return res.status(200).json({ data: getSubjectsData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getSubjectWithSubjectId = async (req, res) => {
    try {
      const { subject_id } = req.params;

      if (!subject_id) return res.status(411).json({ errMsg: '값 없음: subject_id' });

      const getSubjectsData = await this.examinfoService.getSubjectWithSubjectId(subject_id);
      if (!getSubjectsData) {
        return res.status(419).json({ errMsg: '요청 과목 조회 실패' });
      } else {
        return res.status(200).json({ data: getSubjectsData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { subject_id } = req.params;
      const { certificate_id, name } = req.body;

      if (!subject_id) return res.status(411).json({ errMsg: '값 없음: subject_id' });
      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });
      if (!name) return res.status(411).json({ errMsg: '값 없음: name' });

      const updateResult = await this.examinfoService.updateSubject(subject_id, certificate_id, name);

      if (updateResult) {
        return res.status(200).json({ msg: '과목 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '과목 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  dropSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { subject_id } = req.params;

      if (!subject_id) return res.status(411).json({ errMsg: '값 없음: subject_id' });

      const dropResult = await this.examinfoService.dropSubject(subject_id);

      if (dropResult) {
        return res.status(200).json({ msg: '과목 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '과목 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  // ==================================== 시험지 ====================================
  addExam = async (req, res) => {
    try {
      let { major_id, certificate_id, subject_id, year, round } = req.body;

      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });
      if (!subject_id) return res.status(411).json({ errMsg: '값 없음: subject_id' });
      if (!year) return res.status(411).json({ errMsg: '값 없음: year' });
      if (!round) return res.status(411).json({ errMsg: '값 없음: grade' });

      major_id = Number(major_id);
      certificate_id = Number(certificate_id);
      subject_id = Number(subject_id);
      year = Number(year);
      round = Number(round);

      const addExam = await this.examinfoService.addExam(major_id, certificate_id, subject_id, year, round);

      if (addExam) {
        return res.status(200).json({ msg: '시험지 등록 완료', data: addExam });
      } else {
        return res.status(419).json({ errMsg: '시험지 등록 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getExam = async (req, res) => {
    try {
      const getExam = await this.examinfoService.getExam();
      if (getExam.length > 0) {
        return res.status(200).json({ data: getExam });
      } else {
        return res.status(419).json({ errMsg: '시험지 조회 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getExamId = async (req, res) => {
    try {
      let { major_id, certificate_id, subject_id, year, round } = req.body;

      if (!major_id) return res.status(411).json({ errMsg: '값 없음: major_id' });
      if (!certificate_id) return res.status(411).json({ errMsg: '값 없음: certificate_id' });
      if (!subject_id) return res.status(411).json({ errMsg: '값 없음: subject_id' });
      if (!year) return res.status(411).json({ errMsg: '값 없음: year' });
      if (!round) return res.status(411).json({ errMsg: '값 없음: grade' });

      major_id = Number(major_id);
      certificate_id = Number(certificate_id);
      subject_id = Number(subject_id);
      year = Number(year);
      round = Number(round);

      const examData = {
        major_id,
        certificate_id,
        subject_id,
        year,
        round,
      };

      const getExamIdNumber = await this.examinfoService.getExamId(examData);

      if (getExamIdNumber) {
        return res.status(200).json({ exam_id: getExamIdNumber });
      } else {
        return res.status(419).json({ errMsg: '시험지 없음' });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ errMsg: 'exam_id 조회 실패' });
    }
  };

  getExamWithExamId = async (req, res) => {
    try {
      const { exam_id } = req.params;
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      const findExam = await this.examinfoService.getExamWithExamId(exam_id);
      if (findExam) {
        return res.status(200).json({ data: findExam });
      } else {
        return res.status(419).json({ errMsg: '요청 시험지 조회 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateExam = async (req, res) => {
    try {
      const { exam_id } = req.params;
      const { major_id, certificate_id, subject_id, year, round } = req.body;
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      const examData = {
        exam_id,
        major_id,
        certificate_id,
        subject_id,
        year,
        round,
      };
      const updateExam = await this.examinfoService.updateExam(examData);
      if (updateExam) {
        return res.status(200).json({ msg: '시험지 수정 완료', data: updateExam });
      } else {
        return res.status(419).json({ errMsg: '시험지 수정 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  deleteExam = async (req, res) => {
    try {
      const { exam_id } = req.params;
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      const deleteExam = await this.examinfoService.deleteExam(exam_id);
      if (deleteExam) {
        return res.status(200).json({ msg: '시험지 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '시험지 삭제 실패' });
      }
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ExaminfoController;
