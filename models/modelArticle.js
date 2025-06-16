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
      type: DataTypes.TEXT,
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

async function articleOri(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allArticles = await Article.findAll({
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
async function byArticleOri(id) {
  try {
    const articleRaw = await Article.findOne({
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
async function byArticleWhereOri(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Article.findAll({ where: whereClause });
    const ArticleData = await Article.findAll({
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
  Article,
  articleOri,
  byArticleOri,
  byArticleWhereOri,
  addArticle,
  updateArticle,
  deleteArticle,
};
