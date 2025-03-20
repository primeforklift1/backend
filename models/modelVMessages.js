const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const VMessages = sequelizePrime.define(
  "VMessages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    chat_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    datetime: DataTypes.DATE,
  },
  {
    tableName: "v_messages",
    timestamps: false,
  }
);

module.exports = {};