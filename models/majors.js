'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Majors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Users, {
        sourceKey: 'major_id',
        foreignKey: 'major_id',
      });
      this.hasMany(models.Certificates, {
        sourceKey: 'major_id',
        foreignKey: 'major_id',
      });
      this.hasMany(models.Exams, {
        sourceKey: 'major_id',
        foreignKey: 'major_id',
      });
    }
  }
  Majors.init(
    {
      major_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      modelName: 'Majors',
    }
  );
  return Majors;
};
