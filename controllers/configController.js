const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  config,
  byConfig,
  byConfigWhere,
  addConfig,
  updateConfig,
  deleteConfig,
} = require("../models/modelConfig");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.config = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataConfig = await config(page, rowCount);

    const response = {
      statusCode: dataConfig.statusCode,
      status: dataConfig.status,
      message: dataConfig.message,
      transactioId: log.TransactionID,
      totalData: dataConfig.totalData,
      data: dataConfig.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataConfig.statusCode).json(response);
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

// config by id
exports.byConfig = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataConfig = await byConfig(id);

      const response = {
        statusCode: dataConfig.statusCode,
        status: dataConfig.status,
        message: dataConfig.message,
        transactionId: log.TransactionID,
        data: dataConfig.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataConfig.statusCode).json(response);
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
// config by where
exports.byConfigWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id,lang,config_type, status } = req.body;
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
    // Cek jika parameter config_type
    if (config_type) {
      whereClause.config_type = config_type;
    }
    if (status) {
      whereClause.status = status;
    }
    const databyConfigWhere = await byConfigWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databyConfigWhere.statusCode,
      status: databyConfigWhere.status,
      message: databyConfigWhere.message,
      transactionId: log.TransactionID,
      totalData: databyConfigWhere.totalData,
      data: databyConfigWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databyConfigWhere.statusCode).json(response);
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

// add Config
exports.addConfig = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    lang,
    config_name,
    config_value,
    config_type,
    order,
    image,
    icon_class,
    status,
  } = req.body;
  try {
    const dataConfig = {
      lang:lang,
      config_name: config_name,
      config_value: config_value,
      config_type: config_type,
      order: order,
      image: image,
      icon_class: icon_class,
      status: status,
      insert_date: new Date(),
      insert_by: userLogin
    };
    // console.log(dataConfig);
    const dataConfigAdded = await addConfig(dataConfig);

    const response = {
      statusCode: dataConfigAdded.statusCode,
      status: dataConfigAdded.status,
      message: dataConfigAdded.message,
      transactioId: log.TransactionID,
      data: dataConfigAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataConfigAdded.statusCode).json(response);
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
// update Config
exports.updateConfig = async (req, res) => {
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
    config_name,
    config_value,
    config_type,
    order,
    image,
    icon_class,
    status
  } = req.body;
  try {
    const dataConfig = {
        lang:lang,
        config_name: config_name,
        config_value: config_value,
        config_type: config_type,
        order: order,
        image: image,
        icon_class: icon_class,
        status: status,
    };
    // console.log(dataConfig);
    const dataConfigUpdated = await updateConfig(id, dataConfig);

    const response = {
      statusCode: dataConfigUpdated.statusCode,
      status: dataConfigUpdated.status,
      message: dataConfigUpdated.message,
      transactioId: log.TransactionID,
      data: dataConfigUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataConfigUpdated.statusCode).json(response);
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

//delete Config by id Config
exports.deleteConfig = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataConfigDeleted = await deleteConfig(id);

      const response = {
        statusCode: dataConfigDeleted.statusCode,
        status: dataConfigDeleted.status,
        message: dataConfigDeleted.message,
        transactioId: log.TransactionID,
        data: dataConfigDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataConfigDeleted.statusCode).json(response);
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
