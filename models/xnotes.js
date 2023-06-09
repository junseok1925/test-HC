'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Xnotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: 'user_id',
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Exams, {
        targetKey: 'exam_id',
        foreignKey: 'exam_id',
      });
      this.belongsTo(models.Questions, {
        targetKey: 'question_id',
        foreignKey: 'question_id',
      });
    }
  }
  Xnotes.init(
    {
      xnote_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      exam_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      question_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answer: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      marking: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
      modelName: 'Xnotes',
    }
  );
  return Xnotes;
};
