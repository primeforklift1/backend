const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Promosi = sequelizePrime.define(
  "Promosi",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    lang: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "promosi",
    timestamps: false,
  }
);

async function promosi(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allPromosi = await Promosi.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Promosi.count();

    if (allPromosi != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allPromosi,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Promosi!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Promosi By id
async function byPromosi(id) {
  try {
    const promosiRaw = await Promosi.findOne({
      where: {
        id: id,
      },
    });

    if (promosiRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: promosiRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Promosi!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Promosi By where
async function byPromosiWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Promosi.findAll({ where: whereClause });
    const PromosiData = await Promosi.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (PromosiData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: PromosiData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Promosi!",
      data: error.message,
    };
  }
}

async function addPromosi(dataPromosi) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Promosi
    const newPromosi = await Promosi.create(dataPromosi);

    if (newPromosi) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Promosi berhasil ditambahkan!",
        data: newPromosi,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Promosi.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Promosi.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Promosi
async function updatePromosi(id, dataPromosi) {
  try {
    // Cek apakah Promosi dengan id yang diberikan ada dalam database
    const existingDataPromosi = await Promosi.findByPk(id);
    if (!existingDataPromosi) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Promosi tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Promosi
    const updatedPromosi = await existingDataPromosi.update(dataPromosi);

    if (updatedPromosi) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Promosi berhasil diperbaharui!",
        data: updatedPromosi,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Promosi.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Promosi.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Promosi
async function deletePromosi(id) {
  try {
    // Cek apakah Promosi dengan id yang diberikan ada dalam database
    const existingPromosi = await Promosi.findByPk(id);
    if (!existingPromosi) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Promosi tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Promosi
    await existingPromosi.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Promosi berhasil dihapus!",
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
  promosi,
  byPromosi,
  byPromosiWhere,
  addPromosi,
  updatePromosi,
  deletePromosi,
};
