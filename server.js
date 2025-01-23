require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const jwtLib = require("./config/jwt");
const helmet = require("helmet");
const noCache = require("nocache");
const os = require("os");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const logger = require("./config/logger");
// const Inputvalidator = require("./config/validator");
// const { body, validationResult } = require("express-validator");

const app = express();
const port = process.env.APP_PORT;
const allowedOrigins = process.env.CLIENT_URL.split(",");

// Custom CORS function to check if request origin is in the allowedOrigins array
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request if origin is in the allowedOrigins array or if there is no origin (e.g., request from server)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  preflightContinue: false,
};

// Menerapkan pembatasan tingkat permintaan secara umum
const limiter = rateLimit({
  windowMs: 1000, // Periode waktu dalam milidetik (misalnya, 1 detik)
  max: process.env.FETCH_LIMIT_PER_SECOND, // Jumlah maksimum permintaan dalam periode waktu yang ditentukan
  // message: 'Terlalu Banyak Permintaan Tidak Wajar, Silahkan Coba Kembali!',
  message: {
    status: "Error",
    message: "Terlalu Banyak Permintaan Tidak Wajar, Silahkan Coba Kembali!",
  },
});

// Middleware untuk parsing body permintaan
app.use(express.json({ limit: "50mb" }));

// Middleware untuk pembatasan permintaan
app.use(limiter);

// Middleware untuk mencetak alamat IP pengguna berfungsi untuk mengecekann akses di log
app.use((req, res, next) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // console.log(`Request from IP: ${ipAddress}`);
  next();
});

app.use(cors(corsOptions));
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.hsts());
app.use(helmet.contentSecurityPolicy()); // client
app.use(noCache());
app.use(helmet.hidePoweredBy());

app.get("/", limiter, (req, res) => {
  const log = logger.loggerData({ req });
  res.status(200).json({ status: "Sukses", message: "API Ready" });
});

const server = app.listen(port, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server berjalan pada host ${host} dan port ${port}`);
});
