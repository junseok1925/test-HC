const { Majors, Certificates, Subjects, Exams } = require('../models');
const { Op } = require('sequelize');

class ExaminfoRepository {
  // ==================================== 전공 ====================================

  addMajor = async (name) => {
    try {
      return await Majors.create({
        name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getMajors = async () => {
    try {
      return await Majors.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getOneMajor = async (major_id) => {
    try {
      return await Majors.findOne({ where: { major_id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  updateMajor = async (major_id, name) => {
    try {
      return await Majors.update({ name }, { where: { major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropMajor = async (major_id) => {
    try {
      return await Majors.destroy({ where: { major_id: major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 자격증 ====================================

  addCertificate = async (major_id, name, division) => {
    try {
      return await Certificates.create({
        major_id,
        name,
        division,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getCertificate = async () => {
    try {
      return await Certificates.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getCertificateWithMajorId = async (major_id) => {
    try {
      return await Certificates.findAll({ where: { major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getCertificateWithCertificateId = async (certificate_id) => {
    try {
      return await Certificates.findOne({ where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateCertificate = async (certificate_id, major_id, name, division) => {
    try {
      return await Certificates.update({ major_id, name, division }, { where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropCertificate = async (certificate_id) => {
    try {
      return await Certificates.destroy({ where: { certificate_id: certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 과목 ====================================

  addSubject = async (certificate_id, name) => {
    try {
      return await Subjects.create({
        certificate_id,
        name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getSubject = async () => {
    try {
      return await Subjects.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getSubjectWithCertificateId = async (certificate_id) => {
    try {
      return await Subjects.findAll({ where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getSubjectWithSubjectId = async (subject_id) => {
    try {
      return await Subjects.findOne({ where: { subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateSubject = async (subject_id, certificate_id, name) => {
    try {
      return await Subjects.update({ certificate_id, name }, { where: { subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropSubject = async (subject_id) => {
    try {
      return await Subjects.destroy({ where: { subject_id: subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 시험지 ====================================

  addExam = async (major_id, certificate_id, subject_id, year, round) => {
    try {
      const getMajorData = await Majors.findOne({ where: { major_id } });
      const major_name = getMajorData.name;
      const getCertificateData = await Certificates.findOne({ where: { certificate_id } });
      const certificate_name = getCertificateData.name;
      const certificate_division = getCertificateData.division;
      const getSubjectData = await Subjects.findOne({ where: { subject_id } });
      const subject_name = getSubjectData.name;

      return await Exams.create({
        major_id,
        major_name,
        certificate_id,
        certificate_name,
        certificate_division,
        subject_id,
        subject_name,
        year,
        round,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExam = async () => {
    try {
      return await Exams.findAll({
        order: [
          ['major_id', 'ASC'],
          ['certificate_id', 'ASC'],
          ['subject_id', 'ASC'],
          ['year', 'ASC'],
          ['round', 'ASC'],
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExamId = async (examData) => {
    try {
      return await Exams.findOne({
        where: {
          [Op.and]: [
            { major_id: examData.major_id },
            { certificate_id: examData.certificate_id },
            { subject_id: examData.subject_id },
            { year: examData.year },
            { round: examData.round },
          ],
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExamWithExamId = async (exam_id) => {
    try {
      return await Exams.findOne({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateExam = async (examData) => {
    try {
      const { exam_id, major_id, certificate_id, subject_id, year, round } = examData;
      let major_name, certificate_name, certificate_division, subject_name;

      if (major_id) {
        const getMajorData = await Majors.findOne({ where: { major_id } });
        major_name = getMajorData.name;
      }

      if (certificate_id) {
        const getCertificateData = await Certificates.findOne({ where: { certificate_id } });
        certificate_name = getCertificateData.name;
        certificate_division = getCertificateData.division;
      }

      if (subject_id) {
        const getSubjectData = await Subjects.findOne({ where: { subject_id } });
        subject_name = getSubjectData.name;
      }

      await Exams.update(
        {
          major_id,
          major_name,
          certificate_id,
          certificate_name,
          certificate_division,
          subject_id,
          subject_name,
          year,
          round,
        },
        { where: { exam_id } }
      );

      return await Exams.findAll({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };

  deleteExam = async (exam_id) => {
    try {
      return await Exams.destroy({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ExaminfoRepository;
