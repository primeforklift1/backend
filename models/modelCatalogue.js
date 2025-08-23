const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Catalogues = sequelizePrime.define(
  "Catalogues",
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
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id_merk: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    spec: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "catalogues",
    timestamps: false,
  }
);

async function cataloguesOri(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allCataloguess = await Catalogues.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Catalogues.count();

    if (allCataloguess != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allCataloguess,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Catalogues!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Catalogues By id
async function byCataloguesOri(id) {
  try {
    const cataloguesRaw = await Catalogues.findOne({
      where: {
        id: id,
      },
    });

    if (cataloguesRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: cataloguesRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Catalogues!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Catalogues By where
async function byCataloguesWhereOri(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Catalogues.findAll({ where: whereClause });
    const CataloguesData = await Catalogues.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (CataloguesData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: CataloguesData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Catalogues!",
      data: error.message,
    };
  }
}
async function addCatalogues(dataCatalogues) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Catalogues
    const newCatalogues = await Catalogues.create(dataCatalogues);

    if (newCatalogues) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Catalogues berhasil ditambahkan!",
        data: newCatalogues,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Catalogues.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Catalogues.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Catalogues
async function updateCatalogues(id, dataCatalogues) {
  try {
    // Cek apakah Catalogues dengan id yang diberikan ada dalam database
    const existingDataCatalogues = await Catalogues.findByPk(id);
    if (!existingDataCatalogues) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Catalogues tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Catalogues
    const updatedCatalogues = await existingDataCatalogues.update(dataCatalogues);

    if (updatedCatalogues) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Catalogues berhasil diperbaharui!",
        data: updatedCatalogues,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Catalogues.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Catalogues.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Catalogues
async function deleteCatalogues(id) {
  try {
    // Cek apakah Catalogues dengan id yang diberikan ada dalam database
    const existingCatalogues = await Catalogues.findByPk(id);
    if (!existingCatalogues) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Catalogues tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Catalogues
    await existingCatalogues.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Catalogues berhasil dihapus!",
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
  Catalogues,
  cataloguesOri,
  byCataloguesOri,
  byCataloguesWhereOri,
  addCatalogues,
  updateCatalogues,
  deleteCatalogues,
};