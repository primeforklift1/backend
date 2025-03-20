const { sequelizePrime } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Slider = sequelizePrime.define(
  "Slider",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1,
    },
    insert_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    insert_by: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "slider",
    timestamps: false,
  }
);

async function slider(page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }

    const allSliders = await Slider.findAll({
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    const totalRow = await Slider.count();

    if (allSliders != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalRow,
        data: allSliders,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Slider!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Slider By id
async function bySlider(id) {
  try {
    const sliderRaw = await Slider.findOne({
      where: {
        id: id,
      },
    });

    if (sliderRaw != null) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        data: sliderRaw,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Slider!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan Slider By where
async function bySliderWhere(whereClause, page, rowCount) {
  try {
    // Inisialisasi pagination
    let limit = null; // Tanpa batas limit
    let offset = null; // Tanpa offset

    // Cek apakah page dan rowCount disediakan dan valid
    if (page && rowCount) {
      limit = parseInt(rowCount);
      offset = (page - 1) * limit; // Menghitung offset
    }
    const totalData = await Slider.findAll({ where: whereClause });
    const SliderData = await Slider.findAll({
      where: whereClause,
      exclude: ["password"], // Mengecualikan field password,
      limit: limit, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
      offset: offset, // Akan menjadi null jika page atau rowCount tidak valid atau tidak disediakan
    });
    if (SliderData.length > 0) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Data Berhasil Ditemukan!",
        totalData: totalData.length,
        data: SliderData,
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
      message: "Terjadi Kesalahan Saat Menampilkan Data Slider!",
      data: error.message,
    };
  }
}

async function addSlider(dataSlider) {
  try {
    // Gunakan metode create untuk menambah data ke dalam tabel Slider
    const newSlider = await Slider.create(dataSlider);

    if (newSlider) {
      return {
        statusCode: 201,
        status: "Success",
        message: "Slider berhasil ditambahkan!",
        data: newSlider,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal menambahkan Slider.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat menambahkan Slider.",
      data: error.message,
    };
  }
}
// Fungsi untuk mengubah Slider
async function updateSlider(id, dataSlider) {
  try {
    // Cek apakah Slider dengan id yang diberikan ada dalam database
    const existingDataSlider = await Slider.findByPk(id);
    if (!existingDataSlider) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Slider tidak ditemukan.",
      };
    }

    // Gunakan metode create untuk mengubah data ke dalam tabel Slider
    const updatedSlider = await existingDataSlider.update(dataSlider);

    if (updatedSlider) {
      return {
        statusCode: 200,
        status: "Success",
        message: "Slider berhasil diperbaharui!",
        data: updatedSlider,
      };
    } else {
      return {
        statusCode: 400,
        status: "Bad Request",
        message: "Gagal memperbaharui Slider.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbaharui Slider.",
      data: error.message,
    };
  }
}

// Fungsi untuk menghapus Slider
async function deleteSlider(id) {
  try {
    // Cek apakah Slider dengan id yang diberikan ada dalam database
    const existingSlider = await Slider.findByPk(id);
    if (!existingSlider) {
      return {
        statusCode: 404,
        status: "Not Found",
        message: "Data Slider tidak ditemukan.",
      };
    }

    // Gunakan metode destroy untuk menghapus data dari tabel Slider
    await existingSlider.destroy();

    return {
      statusCode: 200,
      status: "Success",
      message: "Slider berhasil dihapus!",
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
  slider,
  bySlider,
  bySliderWhere,
  addSlider,
  updateSlider,
  deleteSlider,
};
