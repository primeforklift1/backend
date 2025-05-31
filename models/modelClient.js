const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Client = sequelizePrime.define(
  "Client",
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    link: {
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
    tableName: "clients",
    timestamps: false,
  }
);

async function client(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allClients = await Client.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Client.count();

    if (allClients != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allClients,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Client!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Client By id
async function byClient(id) {
  try {
    const clientRaw = await Client.findOne({
      where: {
        id: id,
      },
    });

    if (clientRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: clientRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Client!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Client By where
async function byClientWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Client.findAll({ where: whereClause });
    const ClientData = await Client.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (ClientData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: ClientData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Client!",
      data: error.message,
    };
  }
}

async function addClient(dataClient) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Client
    const newClient = await Client.create(dataClient);

    if (newClient) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Client berhasil ditambahkan!",
        data: newClient,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Client.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Client.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Client
async function updateClient(id, dataClient) {
  try {
    // Cek apakah Client dengan id yang diberikan ada dalam database
    const existingDataClient = await Client.findByPk(id);
    if (!existingDataClient) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Client tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Client
    const updatedClient = await existingDataClient.update(dataClient);

    if (updatedClient) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Client berhasil diperbaharui!",
        data: updatedClient,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Client.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Client.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Client
async function deleteClient(id) {
  try {
    // Cek apakah Client dengan id yang diberikan ada dalam database
    const existingClient = await Client.findByPk(id);
    if (!existingClient) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Client tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Client
    await existingClient.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Client berhasil dihapus!",
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
  client,
  byClient,
  byClientWhere,
  addClient,
  updateClient,
  deleteClient,
};
