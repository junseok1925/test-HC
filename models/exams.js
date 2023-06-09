'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Questions, {
        sourceKey: 'exam_id',
        foreignKey: 'exam_id',
      });
      this.hasMany(models.Xnotes, {
        sourceKey: 'exam_id',
        foreignKey: 'exam_id',
      });
      this.hasMany(models.Bookmarks, {
        sourceKey: 'exam_id',
        foreignKey: 'exam_id',
      });
      this.belongsTo(models.Majors, {
        targetKey: 'major_id',
        foreignKey: 'major_id',
      });
      this.belongsTo(models.Certificates, {
        targetKey: 'certificate_id',
        foreignKey: 'certificate_id',
      });
      this.belongsTo(models.Subjects, {
        targetKey: 'subject_id',
        foreignKey: 'subject_id',
      });
    }
  }
  Exams.init(
    {
      exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      major_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      major_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      certificate_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      certificate_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      certificate_division: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      subject_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      subject_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      year: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      round: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Exams',
    }
  );
  return Exams;
};
