const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Message = sequelizePrime.define(
  "Message",
  {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      lang: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      telp: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: 0
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: 1
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
  },
  {
    tableName: "message",
    timestamps: false,
  }
);

async function message(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allMessages = await Message.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Message.count();

    if (allMessages != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allMessages,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Message!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Message By id
async function byMessage(id) {
  try {
    const messageRaw = await Message.findOne({
      where: {
        id: id,
      },
    });

    if (messageRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: messageRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Message!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Message By where
async function byMessageWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Message.findAll({ where: whereClause });
    const MessageData = await Message.findAll({
      where: whereClause,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (MessageData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: MessageData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Message!",
      data: error.message,
    };
  }
}
async function addMessage(dataMessage) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Message
    const newMessage = await Message.create(dataMessage);

    if (newMessage) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Message berhasil ditambahkan!",
        data: newMessage,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Message.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Message.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Message
async function updateMessage(id, dataMessage) {
  try {
    // Cek apakah Message dengan id yang diberikan ada dalam database
    const existingDataMessage = await Message.findByPk(id);
    if (!existingDataMessage) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Message tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Message
    const updatedMessage = await existingDataMessage.update(dataMessage);

    if (updatedMessage) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Message berhasil diperbaharui!",
        data: updatedMessage,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Message.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Message.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Message
async function deleteMessage(id) {
  try {
    // Cek apakah Message dengan id yang diberikan ada dalam database
    const existingMessage = await Message.findByPk(id);
    if (!existingMessage) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Message tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Message
    await existingMessage.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Message berhasil dihapus!",
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
  message,
  byMessage,
  byMessageWhere,
  addMessage,
  updateMessage,
  deleteMessage,
};