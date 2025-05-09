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

app.use(cors());
// app.use(cors(corsOptions));
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.hsts());
app.use(helmet.contentSecurityPolicy()); // client
app.use(noCache());
app.use(helmet.hidePoweredBy());

// Middleware untuk memeriksa validitas token pada setiap permintaan yang memerlukan otentikasi dan role AdminSistem/Admin(Default)
function authenticateToken(requiredRole = "Admin") {
  return async (req, res, next) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const responseAuthenticate = {
      status: "Error",
      message: "Unauthorized",
      transactioId: log.TransactionID,
    };

    if (!token) {
      logger.loggerData({timeStart:log.TimeStamp,
        req,
        result: responseAuthenticate,
        flag: "STOP",
        message: responseAuthenticate.message,
      });
      return res.status(401).json(responseAuthenticate);
    }

    const validToken = token.split(" ");

    if (validToken[0] !== "Bearer") {
      logger.loggerData({timeStart:log.TimeStamp,
        req,
        result: responseAuthenticate,
        flag: "STOP",
        message: "Invalid Token",
      });
      return res
        .status(403)
        .json({
          status: "Error",
          message: "Invalid Token",
          transactioId: log.TransactionID,
        });
    }

    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
      if (err) {
        // console.log(err);
        if (err.name === "TokenExpiredError") {
          logger.loggerData({timeStart:log.TimeStamp,
            req,
            result: responseAuthenticate,
            flag: "STOP",
            message: "Token expired",
          });
          return res
            .status(401)
            .json({ status: "Error", message: "Token expired",transactioId: log.TransactionID, });
        } else {
          logger.loggerData({timeStart:log.TimeStamp,
            req,
            result: responseAuthenticate,
            flag: "STOP",
            message: "Invalid Token",
          });
          return res
            .status(403)
            .json({ status: "Error", message: "Invalid Token",transactioId: log.TransactionID, });
        }
      }

      // Cek apakah peran pengguna sesuai dengan yang diperlukan
      // console.log("JWT Detail : ", user);
      // Dapatkan informasi tentang token yang baru saja dibuat
      const decodedToken = jwtLib.jwt.decode(validToken[1]);
      const createdAt = new Date(decodedToken.iat * 1000); // Konversi ke milidetik
      const expiresAt = new Date((decodedToken.exp || 0) * 1000); // Konversi ke milidetik

      console.log(user.role);
      console.log(requiredRole);
      if (user.role !== requiredRole) {
        logger.loggerData({timeStart:log.TimeStamp,
          req,
          result: responseAuthenticate,
          flag: "STOP",
          message: "Insufficient permissions",
        });
        return res
          .status(403)
          .json({ status: "Error", message: "Insufficient permissions",transactioId: log.TransactionID, });
      }
      // console.log(req.body.user);
      // if (req.body.username != user.username) {
      //   return res
      //     .status(403)
      //     .json({ status: "Error", message: "Token Not Match!" });
      // }
      // req.body.username = user.username;
      next();
    });
  };
}

const userController = require("./controllers/userController");
const menuController = require("./controllers/menuController");
const langController = require("./controllers/langController");
const sliderController = require("./controllers/sliderController");
const configController = require("./controllers/configController");

app.get("/", limiter, (req, res) => {
  const log = logger.loggerData({ req });
  res.status(200).json({ status: "Sukses", message: "API Ready" });
});

// API Login
app.post(
  "/login",
  limiter,
  userController.searchUser
);

// API User
app.get(
  "/admin/user",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.userPrime
);
app.get(
  "/admin/user/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.byUser
);
app.post(
  "/admin/user/where",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.byUserWhere
);
app.post(
  "/admin/user",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.addUser
);
app.put(
  "/admin/user",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.updateUser
);
app.delete(
  "/admin/user/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  userController.deleteUser
);


// API Management

// API Slider
app.get(
  "/admin/slider",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.slider
);
app.get(
  "/admin/slider/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.bySlider
);
app.post(
  "/admin/slider/where",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.bySliderWhere
);
app.post(
  "/admin/slider",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.addSlider
);
app.put(
  "/admin/slider",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.updateSlider
);
app.delete(
  "/admin/slider/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  sliderController.deleteSlider
);

// Public API
app.post(
  "/api/menu",
  menuController.byMenuWhere
);
app.get(
  "/api/language",
  langController.language
);

app.get(
  "/api/slider",
  sliderController.slider
);

app.get(
  "/api/slider/:id",
  sliderController.bySlider
);
app.post(
  "/api/slider/where",
  sliderController.bySliderWhere
);

app.get(
  "/api/config",
  configController.config
);

app.get(
  "/api/config/:id",
  configController.byConfig
);
app.post(
  "/api/config/where",
  configController.byConfigWhere
);

const server = app.listen(port, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server berjalan pada host ${host} dan port ${port}`);
});
