const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Config = sequelizePrime.define(
  "Config",
  {
    config_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    config_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    config_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    config_type: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "text",
    },
    order: {
      type: Sequelize.STRING(25),
      allowNull: false,
      defaultValue: 'text'
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'text'
    },
    icon_class: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'text'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "configs",
    timestamps: false,
  }
);

async function config(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allConfigs = await Config.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Config.count();

    if (allConfigs != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allConfigs,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Config!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Config By id
async function byConfig(id) {
  try {
    const configRaw = await Config.findOne({
      where: {
        config_id: id,
      },
    });

    if (configRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: configRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Config!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Config By where
async function byConfigWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Config.findAll({ where: whereClause });
    const ConfigData = await Config.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (ConfigData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: ConfigData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Config!",
      data: error.message,
    };
  }
}

async function addConfig(dataConfig) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Config
    const newConfig = await Config.create(dataConfig);

    if (newConfig) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Config berhasil ditambahkan!",
        data: newConfig,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Config.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Config.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Config
async function updateConfig(id, dataConfig) {
  try {
    // Cek apakah Config dengan id yang diberikan ada dalam database
    const existingDataConfig = await Config.findByPk(id);
    if (!existingDataConfig) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Config tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Config
    const updatedConfig = await existingDataConfig.update(dataConfig);

    if (updatedConfig) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Config berhasil diperbaharui!",
        data: updatedConfig,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Config.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Config.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Config
async function deleteConfig(id) {
  try {
    // Cek apakah Config dengan id yang diberikan ada dalam database
    const existingConfig = await Config.findByPk(id);
    if (!existingConfig) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Config tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Config
    await existingConfig.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Config berhasil dihapus!",
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
  config,
  byConfig,
  byConfigWhere,
  addConfig,
  updateConfig,
  deleteConfig,
};
