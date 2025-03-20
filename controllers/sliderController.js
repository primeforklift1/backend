const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  slider,
  bySlider,
  bySliderWhere,
  addSlider,
  updateSlider,
  deleteSlider,
} = require("../models/modelSlider");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.slider = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataSlider = await slider(page, rowCount);

    const response = {
      statusCode: dataSlider.statusCode,
      status: dataSlider.status,
      message: dataSlider.message,
      transactioId: log.TransactionID,
      totalData: dataSlider.totalData,
      data: dataSlider.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataSlider.statusCode).json(response);
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

// slider by id
exports.bySlider = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataSlider = await bySlider(id);

      const response = {
        statusCode: dataSlider.statusCode,
        status: dataSlider.status,
        message: dataSlider.message,
        transactionId: log.TransactionID,
        data: dataSlider.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataSlider.statusCode).json(response);
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
// slider by where
exports.bySliderWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id, status } = req.body;
  // Ambil parameter page dan row_count dari query string
  const page = req.query.page;
  const rowCount = req.query.row_count;
  try {
    let whereClause = {};
    // Cek jika parameter id_pengguna
    if (id) {
      whereClause.id = id;
    }
    // Cek jika parameter status_aktif
    if (status) {
      whereClause.status = status;
    }
    const databySliderWhere = await bySliderWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databySliderWhere.statusCode,
      status: databySliderWhere.status,
      message: databySliderWhere.message,
      transactionId: log.TransactionID,
      totalData: databySliderWhere.totalData,
      data: databySliderWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databySliderWhere.statusCode).json(response);
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

// add Slider
exports.addSlider = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    title,
    image,
    text,
    link,
    status
  } = req.body;
  try {
    const dataSlider = {
      title: title,
      image: image,
      text: text,
      link: link,
      status: status,
      insert_date: new Date(),
      insert_by: userLogin
    };
    // console.log(dataSlider);
    const dataSliderAdded = await addSlider(dataSlider);

    const response = {
      statusCode: dataSliderAdded.statusCode,
      status: dataSliderAdded.status,
      message: dataSliderAdded.message,
      transactioId: log.TransactionID,
      data: dataSliderAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataSliderAdded.statusCode).json(response);
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
// update Slider
exports.updateSlider = async (req, res) => {
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
    title,
    image,
    text,
    link,
    status
  } = req.body;
  try {
    const dataSlider = {
        title: title,
        image: image,
        text: text,
        link: link,
        status: status,
    };
    // console.log(dataSlider);
    const dataSliderUpdated = await updateSlider(id, dataSlider);

    const response = {
      statusCode: dataSliderUpdated.statusCode,
      status: dataSliderUpdated.status,
      message: dataSliderUpdated.message,
      transactioId: log.TransactionID,
      data: dataSliderUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataSliderUpdated.statusCode).json(response);
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

//delete Slider by id Slider
exports.deleteSlider = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataSliderDeleted = await deleteSlider(id);

      const response = {
        statusCode: dataSliderDeleted.statusCode,
        status: dataSliderDeleted.status,
        message: dataSliderDeleted.message,
        transactioId: log.TransactionID,
        data: dataSliderDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataSliderDeleted.statusCode).json(response);
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
