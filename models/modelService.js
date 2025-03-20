const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Service = sequelizePrime.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    preface: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "services",
    timestamps: false,
  }
);

module.exports = {};