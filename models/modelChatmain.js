const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const ChatMain = sequelizePrime.define(
  "ChatMain",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    locked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "chat_main",
    timestamps: false,
  }
);

module.exports = {};