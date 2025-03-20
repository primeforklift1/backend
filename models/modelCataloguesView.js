const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const CataloguesView = sequelizePrime.define(
  "CataloguesView",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    id_merk: DataTypes.INTEGER,
    merk: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    type: DataTypes.ENUM("unit", "part", "ban", "battery", "attachment"),
    status: DataTypes.TINYINT,
  },
  {
    tableName: "catalogues_view",
    timestamps: false,
  }
);

module.exports = {};