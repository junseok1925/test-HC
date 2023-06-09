'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Xnotes', {
      xnote_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
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
      question_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'question_id',
        },
        onDelete: 'CASCADE',
      },
      answer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      marking: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Xnotes');
  },
};
