const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  Language
} = require("../models/modelLang");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.language = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataLanguage = await Language(page, rowCount);

    const response = {
      statusCode: dataLanguage.statusCode,
      status: dataLanguage.status,
      message: dataLanguage.message,
      transactioId: log.TransactionID,
      totalData: dataLanguage.totalData,
      data: dataLanguage.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataLanguage.statusCode).json(response);
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
