const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Service = sequelizePrime.define(
  "Service",
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
    title_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    group: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
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
    image: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    tableName: "services",
    timestamps: false,
  }
);


async function service(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allServices = await Service.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Service.count();

    if (allServices != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allServices,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Service!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Service By id
async function byService(id) {
  try {
    const serviceRaw = await Service.findOne({
      where: {
        id: id,
      },
    });

    if (serviceRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: serviceRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Service!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Service By where
async function byServiceWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Service.findAll({ where: whereClause });
    const ServiceData = await Service.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (ServiceData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: ServiceData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Service!",
      data: error.message,
    };
  }
}

async function addService(dataService) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Service
    const newService = await Service.create(dataService);

    if (newService) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Service berhasil ditambahkan!",
        data: newService,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Service.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Service.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Service
async function updateService(id, dataService) {
  try {
    // Cek apakah Service dengan id yang diberikan ada dalam database
    const existingDataService = await Service.findByPk(id);
    if (!existingDataService) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Service tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Service
    const updatedService = await existingDataService.update(dataService);

    if (updatedService) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Service berhasil diperbaharui!",
        data: updatedService,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Service.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Service.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Service
async function deleteService(id) {
  try {
    // Cek apakah Service dengan id yang diberikan ada dalam database
    const existingService = await Service.findByPk(id);
    if (!existingService) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Service tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Service
    await existingService.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Service berhasil dihapus!",
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
  service,
  byService,
  byServiceWhere,
  addService,
  updateService,
  deleteService,
};
