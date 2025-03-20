const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const ArticleView = sequelizePrime.define(
  "ArticleView",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    preface: DataTypes.STRING,
    detail: DataTypes.TEXT,
    keyword: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    insert_user: DataTypes.INTEGER,
    insert_date: DataTypes.DATE,
    update_user: DataTypes.INTEGER,
    update_date: DataTypes.DATE,
    release_date: DataTypes.DATE,
  },
  {
    tableName: "article_view",
    timestamps: false,
  }
);

module.exports = {};