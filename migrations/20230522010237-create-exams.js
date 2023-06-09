'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      major_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Majors',
          key: 'major_id',
        },
        onDelete: 'CASCADE',
      },
      major_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      certificate_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Certificates',
          key: 'certificate_id',
        },
        onDelete: 'CASCADE',
      },
      certificate_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      certificate_division: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subject_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'subject_id',
        },
        onDelete: 'CASCADE',
      },
      subject_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      round: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exams');
  },
};
