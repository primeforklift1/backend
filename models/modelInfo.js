const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Info = sequelizePrime.define(
  "Info",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group_s: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    lang: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(25),
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
    update_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "info",
    timestamps: false,
  }
);

module.exports = {};