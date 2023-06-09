const ExaminfoRepository = require('../repositories/examinfo.repository.js');

class ExaminfoService {
  examinfoRepository = new ExaminfoRepository();

  // ==================================== 전공 ====================================

  addMajor = async (name) => {
    try {
      return await this.examinfoRepository.addMajor(name);
    } catch (err) {
      console.error(err);
    }
  };

  getMajors = async () => {
    try {
      const majorData = await this.examinfoRepository.getMajors();
      //   const majorPrint = majorData.map((item) => {
      //     return {
      //         id: item.major_id,
      //         name: item.name,
      //     }
      //   })
      //   const majorOne = {
      //     id: majorData.major_id,
      //     name: majorData.name,
      //   }
      return majorData;
    } catch (err) {
      console.err(err);
    }
  };

  getOneMajor = async (major_id) => {
    try {
      return await this.examinfoRepository.getOneMajor(major_id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  updateMajor = async (major_id, name) => {
    try {
      return await this.examinfoRepository.updateMajor(major_id, name);
    } catch (err) {
      console.error(err);
    }
  };

  dropMajor = async (major_id) => {
    try {
      return await this.examinfoRepository.dropMajor(major_id);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 자격증 ====================================

  addCertificate = async (certificate_id, name, division) => {
    try {
      return await this.examinfoRepository.addCertificate(certificate_id, name, division);
    } catch (err) {
      console.error(err);
    }
  };

  getCertificate = async () => {
    try {
      const certificateData = await this.examinfoRepository.getCertificate();

      return certificateData;
    } catch (err) {
      console.err(err);
    }
  };

  getCertificateWithMajorId = async (major_id) => {
    try {
      return await this.examinfoRepository.getCertificateWithMajorId(major_id);
    } catch (err) {
      console.error(err);
    }
  };

  getCertificateWithCertificateId = async (certificate_id) => {
    try {
      return await this.examinfoRepository.getCertificateWithCertificateId(certificate_id);
    } catch (err) {
      console.error(err);
    }
  };

  updateCertificate = async (certificate_id, major_id, name, division) => {
    try {
      return await this.examinfoRepository.updateCertificate(certificate_id, major_id, name, division);
    } catch (err) {
      console.error(err);
    }
  };

  dropCertificate = async (certificate_id) => {
    try {
      return await this.examinfoRepository.dropCertificate(certificate_id);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 과목 ====================================

  addSubject = async (certificate_id, name) => {
    try {
      return await this.examinfoRepository.addSubject(certificate_id, name);
    } catch (err) {
      console.error(err);
    }
  };

  getSubject = async () => {
    try {
      const subjectData = await this.examinfoRepository.getSubject();

      return subjectData;
    } catch (err) {
      console.err(err);
    }
  };

  getSubjectWithCertificateId = async (certificate_id) => {
    try {
      return await this.examinfoRepository.getSubjectWithCertificateId(certificate_id);
    } catch (err) {
      console.error(err);
    }
  };

  getSubjectWithSubjectId = async (subject_id) => {
    try {
      return await this.examinfoRepository.getSubjectWithSubjectId(subject_id);
    } catch (err) {
      console.error(err);
    }
  };

  updateSubject = async (subject_id, certificate_id, name) => {
    try {
      return await this.examinfoRepository.updateSubject(subject_id, certificate_id, name);
    } catch (err) {
      console.error(err);
    }
  };

  dropSubject = async (subject_id) => {
    try {
      return await this.examinfoRepository.dropSubject(subject_id);
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 시험지 ====================================

  addExam = async (major_id, certificate_id, subject_id, year, round) => {
    try {
      return await this.examinfoRepository.addExam(major_id, certificate_id, subject_id, year, round);
    } catch (err) {
      console.error(err);
    }
  };

  getExam = async () => {
    try {
      return await this.examinfoRepository.getExam();
    } catch (err) {
      console.error(err);
    }
  };

  getExamId = async (examData) => {
    try {
      const getExamData = await this.examinfoRepository.getExamId(examData);
      return getExamData.exam_id;
    } catch (err) {
      console.error(err);
    }
  };

  getExamWithExamId = async (exam_id) => {
    try {
      return await this.examinfoRepository.getExamWithExamId(exam_id);
    } catch (err) {
      console.error(err);
    }
  };

  updateExam = async (examData) => {
    try {
      return await this.examinfoRepository.updateExam(examData);
    } catch (err) {
      console.error(err);
    }
  };

  deleteExam = async (exam_id) => {
    try {
      return await this.examinfoRepository.deleteExam(exam_id);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ExaminfoService;
