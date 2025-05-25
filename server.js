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
const crypto = require("crypto");
const qs = require("qs");
const path = require("path");
const axios = require("axios");

// Konfigurasi storage dengan nama file SHA1 random
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder tetap "uploads/"
  },
  filename: function (req, file, cb) {
    const sha1 = crypto
      .createHash("sha1")
      .update(file.originalname + Date.now().toString())
      .digest("hex");

    const ext = path.extname(file.originalname); // ambil ekstensi asli
    const fileName = `${sha1}${ext}`;

    req.uploadedFileName = fileName;
    cb(null, fileName);
  }
});

// Inisialisasi multer pakai storage custom
const upload = multer({ storage });

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
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: responseAuthenticate,
        flag: "STOP",
        message: responseAuthenticate.message,
      });
      return res.status(401).json(responseAuthenticate);
    }

    const validToken = token.split(" ");

    if (validToken[0] !== "Bearer") {
      logger.loggerData({
        timeStart: log.TimeStamp,
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
          logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: responseAuthenticate,
            flag: "STOP",
            message: "Token expired",
          });
          return res
            .status(401)
            .json({ status: "Error", message: "Token expired", transactioId: log.TransactionID, });
        } else {
          logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: responseAuthenticate,
            flag: "STOP",
            message: "Invalid Token",
          });
          return res
            .status(403)
            .json({ status: "Error", message: "Invalid Token", transactioId: log.TransactionID, });
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
        logger.loggerData({
          timeStart: log.TimeStamp,
          req,
          result: responseAuthenticate,
          flag: "STOP",
          message: "Insufficient permissions",
        });
        return res
          .status(403)
          .json({ status: "Error", message: "Insufficient permissions", transactioId: log.TransactionID, });
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

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Tangani kesalahan yang dilemparkan oleh Multer
    return res.status(400).json({ message: "Maksimal Upload 1 File!" });
  }
  // Jika bukan kesalahan Multer, teruskan ke error handler berikutnya
  next(err);
};

const userController = require("./controllers/userController");
const translateController = require("./controllers/translateController");

const langController = require("./controllers/langController");
const categoryController = require("./controllers/categoryController");
const merkController = require("./controllers/merkController");
const clientController = require("./controllers/clientController");
const menuController = require("./controllers/menuController");
const configController = require("./controllers/configController");
const sliderController = require("./controllers/sliderController");
const productController = require("./controllers/cataloguesController");
const serviceController = require("./controllers/serviceController");
const articleController = require("./controllers/articleController");
const messageController = require("./controllers/messageController");

app.get("/", limiter, (req, res) => {
  const log = logger.loggerData({ req });
  res.status(200).json({ status: "Sukses", message: "API Ready" });
});


// API Public and Management =====================================================================================================================

// API Login
app.post(
  "/login",
  limiter,
  userController.searchUser
);

// API Translate
app.post(
  "/admin/translate",
  limiter,
  authenticateToken("Admin Sistem"),
  translateController.addTranslate
);

// API Upload
app.post(
  "/admin/upload",
  limiter,
  authenticateToken("Admin Sistem"),
  upload.single("fileData"),
  multerErrorHandler,
  async (req, res) => {
    

    // kirim ke ci4
    const fullFilePath = path.join(__dirname, "uploads", req.uploadedFileName);
    console.log(fullFilePath);
    
    try {
        // Kirim ke CI4 untuk dicopy ke frontend
        const ci4Response = await axios.post(
          process.env.CLIENT_URL + '/copy-node-file',
          qs.stringify({
            sourcePath: fullFilePath,
            sourceDir: 'uploads/'
          }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        );

        return res.json({
          folder: "uploads",
          fileName: req.uploadedFileName,
          pathLocation:"uploads/"+req.uploadedFileName,
          ci4Response: ci4Response.data
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Gagal kirim ke CI4' });
    }

    // 
  }
);

// ==============================================================

// API User =====================================================
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

// API Language =================================================
app.get(
  "/api/language",
  langController.language
);
app.get(
  "/api/language/:id",
  langController.byLanguage
);
app.post(
  "/api/language/where",
  langController.byLanguageWhere
);
app.post(
  "/admin/language",
  limiter,
  authenticateToken("Admin Sistem"),
  langController.addLanguage
);
app.put(
  "/admin/language",
  limiter,
  authenticateToken("Admin Sistem"),
  langController.updateLanguage
);
app.delete(
  "/admin/language/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  langController.deleteLanguage
);

// API Category =================================================
app.get(
  "/api/category",
  categoryController.category
);
app.get(
  "/api/category/:id",
  categoryController.byCategory
);
app.post(
  "/api/category/where",
  categoryController.byCategoryWhere
);
app.post(
  "/admin/category",
  limiter,
  authenticateToken("Admin Sistem"),
  categoryController.addCategory
);
app.put(
  "/admin/category",
  limiter,
  authenticateToken("Admin Sistem"),
  categoryController.updateCategory
);
app.delete(
  "/admin/category/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  categoryController.deleteCategory
);

// API Merk =================================================
app.get(
  "/api/merk",
  merkController.merk
);
app.get(
  "/api/merk/:id",
  merkController.byMerk
);
app.post(
  "/api/merk/where",
  merkController.byMerkWhere
);
app.post(
  "/admin/merk",
  limiter,
  authenticateToken("Admin Sistem"),
  merkController.addMerk
);
app.put(
  "/admin/merk",
  limiter,
  authenticateToken("Admin Sistem"),
  merkController.updateMerk
);
app.delete(
  "/admin/merk/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  merkController.deleteMerk
);

// API Client =================================================
app.get(
  "/api/client",
  clientController.client
);
app.get(
  "/api/client/:id",
  clientController.byClient
);
app.post(
  "/api/client/where",
  clientController.byClientWhere
);
app.post(
  "/admin/client",
  limiter,
  authenticateToken("Admin Sistem"),
  clientController.addClient
);
app.put(
  "/admin/client",
  limiter,
  authenticateToken("Admin Sistem"),
  clientController.updateClient
);
app.delete(
  "/admin/client/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  clientController.deleteClient
);

// API Menu ===================================================
app.get(
  "/api/menu",
  menuController.menu
);

app.get(
  "/api/menu/:id",
  menuController.byMenu
);
app.post(
  "/api/menu/where",
  menuController.byMenuWhere
);
app.post(
  "/api/menu/where-all",
  menuController.byMenuWhereAll
);
app.post(
  "/admin/menu",
  limiter,
  authenticateToken("Admin Sistem"),
  menuController.addMenu
);
app.put(
  "/admin/menu",
  limiter,
  authenticateToken("Admin Sistem"),
  menuController.updateMenu
);
app.delete(
  "/admin/menu/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  menuController.deleteMenu
);

// API Config ===================================================
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
app.post(
  "/admin/config",
  limiter,
  authenticateToken("Admin Sistem"),
  configController.addConfig
);
app.put(
  "/admin/config",
  limiter,
  authenticateToken("Admin Sistem"),
  configController.updateConfig
);
app.delete(
  "/admin/config/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  configController.deleteConfig
);

// API Slider ===================================================
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

// API Product ===================================================
app.get(
  "/api/product",
  productController.catalogues
);

app.get(
  "/api/product/:id",
  productController.byCatalogues
);
app.post(
  "/api/product/where",
  productController.byCataloguesWhere
);

app.post(
  "/admin/product",
  limiter,
  authenticateToken("Admin Sistem"),
  productController.addCatalogues
);
app.put(
  "/admin/product",
  limiter,
  authenticateToken("Admin Sistem"),
  productController.updateCatalogues
);
app.delete(
  "/admin/product/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  productController.deleteCatalogues
);

// API Service ===================================================
app.get(
  "/api/service",
  serviceController.service
);

app.get(
  "/api/service/:id",
  serviceController.byService
);
app.post(
  "/api/service/where",
  serviceController.byServiceWhere
);
app.post(
  "/admin/service",
  limiter,
  authenticateToken("Admin Sistem"),
  serviceController.addService
);
app.put(
  "/admin/service",
  limiter,
  authenticateToken("Admin Sistem"),
  serviceController.updateService
);
app.delete(
  "/admin/service/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  serviceController.deleteService
);

// API Blog ===================================================
app.get(
  "/api/blog",
  articleController.article
);

app.get(
  "/api/blog/:id",
  articleController.byArticle
);
app.post(
  "/api/blog/where",
  articleController.byArticleWhere
);
app.post(
  "/admin/blog",
  limiter,
  authenticateToken("Admin Sistem"),
  articleController.addArticle
);
app.put(
  "/admin/blog",
  limiter,
  authenticateToken("Admin Sistem"),
  articleController.updateArticle
);
app.delete(
  "/admin/blog/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  articleController.deleteArticle
);

// API Message ===================================================
app.get(
  "/api/message",
  messageController.message
);

app.get(
  "/api/message/:id",
  messageController.byMessage
);
app.post(
  "/api/message/where",
  messageController.byMessageWhere
);
app.post(
  "/admin/message",
  limiter,
  authenticateToken("Admin Sistem"),
  messageController.addMessage
);
app.put(
  "/admin/message",
  limiter,
  authenticateToken("Admin Sistem"),
  messageController.updateMessage
);
app.delete(
  "/admin/message/:id",
  limiter,
  authenticateToken("Admin Sistem"),
  messageController.deleteMessage
);



const server = app.listen(port, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server berjalan pada host ${host} dan port ${port}`);
});
