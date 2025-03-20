require("dotenv").config();
const { Sequelize } = require("sequelize");

let statusLog = false;
if(process.env.SQL_LOGGING == "true"){
  statusLog = true;
  console.log("true");
  console.log(statusLog);
}
// Inisialisasi koneksi ke database Prime
const sequelizePrime = new Sequelize(
  process.env.DB_PRIME_NAME,
  process.env.DB_PRIME_USER,
  process.env.DB_PRIME_PASS,
  {
    host: process.env.DB_PRIME_HOST,
    port: process.env.DB_PRIME_PORT,
    dialect: "mysql",
    logging: statusLog, // Menonaktifkan log query SQL
  }
);
// Cek koneksi ke database
sequelizePrime
  .authenticate()
  .then(() => {
    console.log("Terhubung ke Database Prime.");
  })
  .catch((error) => {
    console.error("Gagal Terhubung Ke Database Prime", error);
  });

module.exports = { sequelizePrime };
