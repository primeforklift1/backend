const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Article = sequelizePrime.define(
  "Article",
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
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    preface: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keyword: {
      type: DataTypes.STRING(75),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    insert_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "article",
    timestamps: false,
  }
);

async function addArticle(dataArticle) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Article
    const newArticle = await Article.create(dataArticle);

    if (newArticle) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Article berhasil ditambahkan!",
        data: newArticle,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Article.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Article.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Article
async function updateArticle(id, dataArticle) {
  try {
    // Cek apakah Article dengan id yang diberikan ada dalam database
    const existingDataArticle = await Article.findByPk(id);
    if (!existingDataArticle) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Article tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Article
    const updatedArticle = await existingDataArticle.update(dataArticle);

    if (updatedArticle) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Article berhasil diperbaharui!",
        data: updatedArticle,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Article.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Article.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Article
async function deleteArticle(id) {
  try {
    // Cek apakah Article dengan id yang diberikan ada dalam database
    const existingArticle = await Article.findByPk(id);
    if (!existingArticle) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Article tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Article
    await existingArticle.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Article berhasil dihapus!",
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
  addArticle,
  updateArticle,
  deleteArticle,
};
