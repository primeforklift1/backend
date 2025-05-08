const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Menu = sequelizePrime.define(
  "Menu",
  {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      lang: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      parent: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      order: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      menu_type: {
          type: Sequelize.TINYINT(1),
          allowNull: true,
          defaultValue: 0
      },
      menu_name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: 1
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      insert_by: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
  },
  {
    tableName: "menu",
    timestamps: false,
  }
);

// Fungsi untuk menampilkan Menu By where
async function byMenuWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Menu.findAll({ where: whereClause });
    const MenuData = await Menu.findAll({
      where: whereClause,
      exclude: ["password"], // Mengecualikan field password,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (MenuData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: MenuData,
      };
    } else {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Tidak Ditemukan!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Menampilkan Data Menu!",
      data: error.message,
    };
  }
}

module.exports = {
    byMenuWhere
};