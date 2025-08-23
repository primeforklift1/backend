const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const CataloguesView = sequelizePrime.define(
  "CataloguesView",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    group_s: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    id_merk: DataTypes.INTEGER,
    merk: DataTypes.STRING,
    description: DataTypes.TEXT,
    spec: DataTypes.TEXT,
    image: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
    status: DataTypes.TINYINT,
  },
  {
    tableName: "catalogues_view",
    timestamps: false,
  }
);

async function catalogues(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allCataloguess = await CataloguesView.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await CataloguesView.count();

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
async function byCatalogues(id) {
  try {
    const cataloguesRaw = await CataloguesView.findOne({
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
async function byCataloguesWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await CataloguesView.findAll({ where: whereClause });
    const CataloguesData = await CataloguesView.findAll({
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

module.exports = {
  catalogues,
  byCatalogues,
  byCataloguesWhere
};