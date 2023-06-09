'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Xnotes, {
        sourceKey: 'question_id',
        foreignKey: 'question_id',
      });
      this.hasMany(models.Bookmarks, {
        sourceKey: 'question_id',
        foreignKey: 'question_id',
      });
      this.belongsTo(models.Exams, {
        targetKey: 'exam_id',
        foreignKey: 'exam_id',
      });
    }
  }
  Questions.init(
    {
      question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sort_num: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      question_num: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      question: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      example: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      choice: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      answer: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      solve: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      bookmark_count: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Questions',
    }
  );
  return Questions;
};
