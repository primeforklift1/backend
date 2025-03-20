const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const VArticle = sequelizePrime.define(
  "VArticle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    preface: DataTypes.STRING,
    detail: DataTypes.TEXT,
    keyword: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.TINYINT,
    insert_user: DataTypes.INTEGER,
    insert_date: DataTypes.DATE,
    update_user: DataTypes.INTEGER,
    update_date: DataTypes.DATE,
    release_date: DataTypes.DATE,
    release_age: DataTypes.INTEGER,
  },
  {
    tableName: "v_article",
    timestamps: false,
  }
);

module.exports = {};