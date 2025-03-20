const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Gallery = sequelizePrime.define(
  "Gallery",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    file: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    caption: {
      type: DataTypes.STRING(75),
      allowNull: true,
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("normal", "catalogue", "logo"),
      allowNull: false,
      defaultValue: "normal",
    },
  },
  {
    tableName: "gallery",
    timestamps: false,
  }
);

module.exports = {};