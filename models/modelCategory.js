const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Category = sequelizePrime.define(
  "Category",
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
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

async function category(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allCategorys = await Category.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Category.count();

    if (allCategorys != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allCategorys,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Category!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Category By id
async function byCategory(id) {
  try {
    const categoryRaw = await Category.findOne({
      where: {
        id: id,
      },
    });

    if (categoryRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: categoryRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Category!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Category By where
async function byCategoryWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Category.findAll({ where: whereClause });
    const CategoryData = await Category.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (CategoryData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: CategoryData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Category!",
      data: error.message,
    };
  }
}
async function addCategory(dataCategory) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Category
    const newCategory = await Category.create(dataCategory);

    if (newCategory) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Category berhasil ditambahkan!",
        data: newCategory,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Category.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Category.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Category
async function updateCategory(id, dataCategory) {
  try {
    // Cek apakah Category dengan id yang diberikan ada dalam database
    const existingDataCategory = await Category.findByPk(id);
    if (!existingDataCategory) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Category tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Category
    const updatedCategory = await existingDataCategory.update(dataCategory);

    if (updatedCategory) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Category berhasil diperbaharui!",
        data: updatedCategory,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Category.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Category.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Category
async function deleteCategory(id) {
  try {
    // Cek apakah Category dengan id yang diberikan ada dalam database
    const existingCategory = await Category.findByPk(id);
    if (!existingCategory) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Category tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Category
    await existingCategory.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Category berhasil dihapus!",
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
  category,
  byCategory,
  byCategoryWhere,
  addCategory,
  updateCategory,
  deleteCategory,
};