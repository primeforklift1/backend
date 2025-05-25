const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Lang = sequelizePrime.define(
  "Lang",
  {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    },
    translate_id: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
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

// Fungsi untuk menampilkan Language By id
async function byLanguage(id) {
  try {
    const languageRaw = await Lang.findOne({
      where: {
        id: id,
      },
    });

    if (languageRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: languageRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Language!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Language By where
async function byLanguageWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Lang.findAll({ where: whereClause });
    const LanguageData = await Lang.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (LanguageData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: LanguageData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Language!",
      data: error.message,
    };
  }
}

async function addLanguage(dataLanguage) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Language
    const newLanguage = await Lang.create(dataLanguage);

    if (newLanguage) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Language berhasil ditambahkan!",
        data: newLanguage,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Language.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Language.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Language
async function updateLanguage(id, dataLanguage) {
  try {
    // Cek apakah Language dengan id yang diberikan ada dalam database
    const existingDataLanguage = await Lang.findByPk(id);
    if (!existingDataLanguage) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Language tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Language
    const updatedLanguage = await existingDataLanguage.update(dataLanguage);

    if (updatedLanguage) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Language berhasil diperbaharui!",
        data: updatedLanguage,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Language.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Language.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Language
async function deleteLanguage(id) {
  try {
    // Cek apakah Language dengan id yang diberikan ada dalam database
    const existingLanguage = await Lang.findByPk(id);
    if (!existingLanguage) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Language tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Language
    await existingLanguage.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Language berhasil dihapus!",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Data masih digunakan di Tabel Data Lain!",
      data: "Data masih digunakan di Tabel Data Lain!",
    };
  }
}

module.exports = {
  Language,
  byLanguage,
  byLanguageWhere,
  addLanguage,
  updateLanguage,
  deleteLanguage,
};