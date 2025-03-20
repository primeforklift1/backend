const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const ChatMessage = sequelizePrime.define(
  "ChatMessage",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "chat_main",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    message: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "chat_message",
    timestamps: false,
  }
);

ChatMessage.associate = (models) => {
  ChatMessage.belongsTo(models.ChatMain, { foreignKey: "chat_id", as: "chat" });
};

module.exports = {};