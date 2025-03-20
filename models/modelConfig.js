const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Config = sequelizePrime.define(
  "Config",
  {
    config_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    config_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    config_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    config_type: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "text",
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "configs",
    timestamps: false,
  }
);

module.exports = {};