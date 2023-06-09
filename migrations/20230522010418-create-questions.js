'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exam_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exams',
          key: 'exam_id',
        },
        onDelete: 'CASCADE',
      },
      sort_num: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      question_num: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      question: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      example: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      choice: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      answer: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      solve: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      bookmark_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('Questions');
  },
};
