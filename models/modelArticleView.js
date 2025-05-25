const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const ArticleView = sequelizePrime.define(
  "ArticleView",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    lang: DataTypes.STRING,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    preface: DataTypes.STRING,
    detail: DataTypes.TEXT,
    keyword: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.INTEGER,
    insert_user: DataTypes.INTEGER,
    insert_date: DataTypes.DATE,
    update_user: DataTypes.INTEGER,
    update_date: DataTypes.DATE,
    release_date: DataTypes.DATE,
  },
  {
    tableName: "article_view",
    timestamps: false,
  }
);

async function article(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allArticles = await ArticleView.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await ArticleView.count();

    if (allArticles != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allArticles,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Article!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Article By id
async function byArticle(id) {
  try {
    const articleRaw = await ArticleView.findOne({
      where: {
        id: id,
      },
    });

    if (articleRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: articleRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Article!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Article By where
async function byArticleWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await ArticleView.findAll({ where: whereClause });
    const ArticleData = await ArticleView.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (ArticleData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: ArticleData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Article!",
      data: error.message,
    };
  }
}

module.exports = {
  article,
  byArticle,
  byArticleWhere
};