const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Lang = sequelizePrime.define(
  "Lang",
  {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    sort_name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    name: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    flag_image: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    tableName: "lang",
    timestamps: false,
  }
);

async function Language(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allLang = await Lang.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      where:{status:"1"}
    });
    const totalRow = await Lang.count();

    if (allLang != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allLang,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Bahasa!",
      data: error.message,
    };
  }
}

module.exports = {
  Language
};