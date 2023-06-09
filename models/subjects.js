'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Exams, {
        sourceKey: 'subject_id',
        foreignKey: 'subject_id',
      });
      this.belongsTo(models.Certificates, {
        targetKey: 'certificate_id',
        foreignKey: 'certificate_id',
      });
    }
  }
  Subjects.init(
    {
      subject_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      certificate_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Subjects',
    }
  );
  return Subjects;
};
