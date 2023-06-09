'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Subjects, {
        sourceKey: 'certificate_id',
        foreignKey: 'certificate_id',
      });
      this.hasMany(models.Exams, {
        sourceKey: 'certificate_id',
        foreignKey: 'certificate_id',
      });
      this.belongsTo(models.Majors, {
        targetKey: 'major_id',
        foreignKey: 'major_id',
      });
    }
  }
  Certificates.init(
    {
      certificate_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      major_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      division: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Certificates',
    }
  );
  return Certificates;
};
