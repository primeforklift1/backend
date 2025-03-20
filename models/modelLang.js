const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Lang = sequelizePrime.define(
  "Lang",
  {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
  },
  {
    tableName: "lang",
    timestamps: false,
  }
);

module.exports = {};