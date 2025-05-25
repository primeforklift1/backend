const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  service,
  byService,
  byServiceWhere,
  addService,
  updateService,
  deleteService,
} = require("../models/modelService");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.service = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataService = await service(page, rowCount);

    const response = {
      statusCode: dataService.statusCode,
      status: dataService.status,
      message: dataService.message,
      transactioId: log.TransactionID,
      totalData: dataService.totalData,
      data: dataService.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataService.statusCode).json(response);
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

// service by id
exports.byService = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataService = await byService(id);

      const response = {
        statusCode: dataService.statusCode,
        status: dataService.status,
        message: dataService.message,
        transactionId: log.TransactionID,
        data: dataService.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataService.statusCode).json(response);
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
// service by where
exports.byServiceWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id,lang,group, status } = req.body;
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
    // Cek jika parameter group
    if (group) {
      whereClause.group = group;
    }
    if (status) {
      whereClause.status = status;
    }
    const databyServiceWhere = await byServiceWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databyServiceWhere.statusCode,
      status: databyServiceWhere.status,
      message: databyServiceWhere.message,
      transactionId: log.TransactionID,
      totalData: databyServiceWhere.totalData,
      data: databyServiceWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databyServiceWhere.statusCode).json(response);
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

// add Service
exports.addService = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    lang,
    group,
    name,
    preface,
    detail,
    image,
    status,
  } = req.body;
  try {
    const dataService = {
      lang:lang,
      group: group,
      name: name,
      preface: preface,
      detail: detail,
      image: image,
      status: status,
      insert_date: new Date(),
      insert_by: userLogin
    };
    // console.log(dataService);
    const dataServiceAdded = await addService(dataService);

    const response = {
      statusCode: dataServiceAdded.statusCode,
      status: dataServiceAdded.status,
      message: dataServiceAdded.message,
      transactioId: log.TransactionID,
      data: dataServiceAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataServiceAdded.statusCode).json(response);
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
// update Service
exports.updateService = async (req, res) => {
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
    group,
    name,
    preface,
    detail,
    image,
    status,
  } = req.body;
  try {
    const dataService = {
        lang:lang,
        group: group,
        name: name,
        preface: preface,
        detail: detail,
        image: image,
        status: status,
    };
    // console.log(dataService);
    const dataServiceUpdated = await updateService(id, dataService);

    const response = {
      statusCode: dataServiceUpdated.statusCode,
      status: dataServiceUpdated.status,
      message: dataServiceUpdated.message,
      transactioId: log.TransactionID,
      data: dataServiceUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataServiceUpdated.statusCode).json(response);
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

//delete Service by id Service
exports.deleteService = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataServiceDeleted = await deleteService(id);

      const response = {
        statusCode: dataServiceDeleted.statusCode,
        status: dataServiceDeleted.status,
        message: dataServiceDeleted.message,
        transactioId: log.TransactionID,
        data: dataServiceDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataServiceDeleted.statusCode).json(response);
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
