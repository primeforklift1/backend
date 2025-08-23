const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Merk = sequelizePrime.define(
  "Merk",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group_s: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    lang: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "merk",
    timestamps: false,
  }
);


async function merk(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allMerks = await Merk.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Merk.count();

    if (allMerks != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allMerks,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Merk!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Merk By id
async function byMerk(id) {
  try {
    const merkRaw = await Merk.findOne({
      where: {
        id: id,
      },
    });

    if (merkRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: merkRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Merk!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Merk By where
async function byMerkWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Merk.findAll({ where: whereClause });
    const MerkData = await Merk.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (MerkData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: MerkData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Merk!",
      data: error.message,
    };
  }
}

async function addMerk(dataMerk) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Merk
    const newMerk = await Merk.create(dataMerk);

    if (newMerk) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Merk berhasil ditambahkan!",
        data: newMerk,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Merk.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Merk.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Merk
async function updateMerk(id, dataMerk) {
  try {
    // Cek apakah Merk dengan id yang diberikan ada dalam database
    const existingDataMerk = await Merk.findByPk(id);
    if (!existingDataMerk) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Merk tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Merk
    const updatedMerk = await existingDataMerk.update(dataMerk);

    if (updatedMerk) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Merk berhasil diperbaharui!",
        data: updatedMerk,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Merk.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Merk.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Merk
async function deleteMerk(id) {
  try {
    // Cek apakah Merk dengan id yang diberikan ada dalam database
    const existingMerk = await Merk.findByPk(id);
    if (!existingMerk) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Merk tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Merk
    await existingMerk.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Merk berhasil dihapus!",
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
  merk,
  byMerk,
  byMerkWhere,
  addMerk,
  updateMerk,
  deleteMerk,
};
