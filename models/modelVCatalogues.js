const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const VCatalogues = sequelizePrime.define(
  "VCatalogues",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    id_merk: DataTypes.INTEGER,
    merk: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.INTEGER,
  },
  {
    tableName: "v_catalogues",
    timestamps: false,
  }
);

module.exports = {};