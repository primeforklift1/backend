const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const User = sequelizePrime.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: "1",
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    insert_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Fungsi untuk menampilkan User admin Prime
async function loginProses(username, password) {
  try {
    const users = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (users != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Login Berhasil!",
        data: users,
      };
    } else {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Username atau kata sandi salah!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Login!",
      data: error.message,
    };
  }
}

async function userPrime(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allUsers = await User.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await User.count();

    if (allUsers != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allUsers,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data User!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan User By id
async function byUser(id) {
  try {
    const userRaw = await User.findOne({
      where: {
        id: id,
      },
    });

    if (userRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: userRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data User!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan User By where
async function byUserWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await User.findAll({ where: whereClause });
    const UserData = await User.findAll({
      where: whereClause,
      exclude: ["password"], // Mengecualikan field password,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (UserData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: UserData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data User!",
      data: error.message,
    };
  }
}

async function addUser(dataUser) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel User
    const newUser = await User.create(dataUser);

    if (newUser) {
      return {
        statusCode: 201,
        status: "Success",
        message: "User berhasil ditambahkan!",
        data: newUser,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan User.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan User.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah User
async function updateUser(id, dataUser) {
  try {
    // Cek apakah User dengan id yang diberikan ada dalam database
    const existingDataUser = await User.findByPk(id);
    if (!existingDataUser) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data User tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel User
    const updatedUser = await existingDataUser.update(dataUser);

    if (updatedUser) {
      return {
        statusCode: 200,
        status: "Success",
        message: "User berhasil diperbaharui!",
        data: updatedUser,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui User.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui User.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus User
async function deleteUser(id) {
  try {
    // Cek apakah User dengan id yang diberikan ada dalam database
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data User tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel User
    await existingUser.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "User berhasil dihapus!",
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
  loginProses,
  userPrime,
  byUser,
  byUserWhere,
  addUser,
  updateUser,
  deleteUser,
};
