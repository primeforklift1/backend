const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  addArticle,
  updateArticle,
  deleteArticle,
} = require("../models/modelArticle");
const {
  article,
  byArticle,
  byArticleWhere
} = require("../models/modelArticleView");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.article = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataArticle = await article(page, rowCount);

    const response = {
      statusCode: dataArticle.statusCode,
      status: dataArticle.status,
      message: dataArticle.message,
      transactioId: log.TransactionID,
      totalData: dataArticle.totalData,
      data: dataArticle.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataArticle.statusCode).json(response);
  } catch (error) {
    // console.log(error);
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

// article by id
exports.byArticle = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataArticle = await byArticle(id);

      const response = {
        statusCode: dataArticle.statusCode,
        status: dataArticle.status,
        message: dataArticle.message,
        transactionId: log.TransactionID,
        data: dataArticle.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataArticle.statusCode).json(response);
    } catch (error) {
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response500,
        flag: "ERROR",
        message: error.message,
      });
      response500.transactioId = log.TransactionID;
      res.status(500).json(response500);
    }
  } else {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response400,
      flag: "STOP",
      message: response400.message,
    });
    response400.transactioId = log.TransactionID;
    res.status(400).json(response400);
  }
};
// article by where
exports.byArticleWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id,lang, status } = req.body;
  // Ambil parameter page dan row_count dari query string
  const page = req.query.page;
  const rowCount = req.query.row_count;
  try {
    let whereClause = {};
    // Cek jika parameter id_pengguna
    if (id) {
      whereClause.id = id;
    }

    // Cek jika parameter lang
    if (lang) {
      whereClause.lang = lang;
    }
    if (status) {
      whereClause.status = status;
    }
    const databyArticleWhere = await byArticleWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databyArticleWhere.statusCode,
      status: databyArticleWhere.status,
      message: databyArticleWhere.message,
      transactionId: log.TransactionID,
      totalData: databyArticleWhere.totalData,
      data: databyArticleWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databyArticleWhere.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

// add Article
exports.addArticle = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    lang,
    slug,
    title,
    preface,
    detail,
    keyword,
    image,
    status,
  } = req.body;
  try {
    const dataArticle = {
      lang:lang,
      slug: slug,
      title: title,
      preface: preface,
      detail: detail,
      keyword: keyword,
      image: image,
      status: status,
      insert_date: new Date(),
      insert_by: userLogin
    };
    // console.log(dataArticle);
    const dataArticleAdded = await addArticle(dataArticle);

    const response = {
      statusCode: dataArticleAdded.statusCode,
      status: dataArticleAdded.status,
      message: dataArticleAdded.message,
      transactioId: log.TransactionID,
      data: dataArticleAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataArticleAdded.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};
// update Article
exports.updateArticle = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });
  // console.log(userLogin);
  const {
    id,
    lang,
    slug,
    title,
    preface,
    detail,
    keyword,
    image,
    status,
  } = req.body;
  try {
    const dataArticle = {
      lang:lang,
      slug: slug,
      title: title,
      preface: preface,
      detail: detail,
      keyword: keyword,
      image: image,
      status: status,
    };
    // console.log(dataArticle);
    const dataArticleUpdated = await updateArticle(id, dataArticle);

    const response = {
      statusCode: dataArticleUpdated.statusCode,
      status: dataArticleUpdated.status,
      message: dataArticleUpdated.message,
      transactioId: log.TransactionID,
      data: dataArticleUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataArticleUpdated.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

//delete Article by id Article
exports.deleteArticle = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataArticleDeleted = await deleteArticle(id);

      const response = {
        statusCode: dataArticleDeleted.statusCode,
        status: dataArticleDeleted.status,
        message: dataArticleDeleted.message,
        transactioId: log.TransactionID,
        data: dataArticleDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataArticleDeleted.statusCode).json(response);
    } catch (error) {
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response500,
        flag: "ERROR",
        message: error.message,
      });
      response500.transactioId = log.TransactionID;
      res.status(500).json(response500);
    }
  } else {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response400,
      flag: "ERROR",
      message: response400.message,
    });
    response400.transactioId = log.TransactionID;
    res.status(400).json(response400);
  }
};
