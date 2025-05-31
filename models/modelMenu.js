const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Menu = sequelizePrime.define(
  "Menu",
  {
    id: {
        type: Sequelize.INTEGER,
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
      parent: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      order: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      menu_type: {
          type: Sequelize.TINYINT(1),
          allowNull: true,
          defaultValue: 0
      },
      menu_name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      link: {
        type: Sequelize.STRING(255),
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
      },
      insert_by: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
  },
  {
    tableName: "menu",
    timestamps: false,
  }
);

async function menu(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allMenus = await Menu.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Menu.count();

    if (allMenus != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allMenus,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Menu!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Menu By id
async function byMenu(id) {
  try {
    const menuRaw = await Menu.findOne({
      where: {
        id: id,
      },
    });

    if (menuRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: menuRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Menu!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Menu By where
async function byMenuWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Menu.findAll({ where: whereClause });
    const MenuData = await Menu.findAll({
      where: whereClause,
      exclude: ["password"], // Mengecualikan field password,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (MenuData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: MenuData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Menu!",
      data: error.message,
    };
  }
}

async function addMenu(dataMenu) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Menu
    const newMenu = await Menu.create(dataMenu);

    if (newMenu) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Menu berhasil ditambahkan!",
        data: newMenu,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Menu.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Menu.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Menu
async function updateMenu(id, dataMenu) {
  try {
    // Cek apakah Menu dengan id yang diberikan ada dalam database
    const existingDataMenu = await Menu.findByPk(id);
    if (!existingDataMenu) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Menu tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Menu
    const updatedMenu = await existingDataMenu.update(dataMenu);

    if (updatedMenu) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Menu berhasil diperbaharui!",
        data: updatedMenu,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Menu.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Menu.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Menu
async function deleteMenu(id) {
  try {
    // Cek apakah Menu dengan id yang diberikan ada dalam database
    const existingMenu = await Menu.findByPk(id);
    if (!existingMenu) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Menu tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Menu
    await existingMenu.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Menu berhasil dihapus!",
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
  menu,
  byMenu,
  byMenuWhere,
  addMenu,
  updateMenu,
  deleteMenu,
};
