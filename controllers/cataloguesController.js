const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  addCatalogues,
  updateCatalogues,
  deleteCatalogues,
} = require("../models/modelCatalogue");
const {
  catalogues,
  byCatalogues,
  byCataloguesWhere
} = require("../models/modelCataloguesView");
const { type } = require("os");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.catalogues = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataCatalogues = await catalogues(page, rowCount);

    const response = {
      statusCode: dataCatalogues.statusCode,
      status: dataCatalogues.status,
      message: dataCatalogues.message,
      transactioId: log.TransactionID,
      totalData: dataCatalogues.totalData,
      data: dataCatalogues.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataCatalogues.statusCode).json(response);
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

// catalogues by id
exports.byCatalogues = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataCatalogues = await byCatalogues(id);

      const response = {
        statusCode: dataCatalogues.statusCode,
        status: dataCatalogues.status,
        message: dataCatalogues.message,
        transactionId: log.TransactionID,
        data: dataCatalogues.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataCatalogues.statusCode).json(response);
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
// catalogues by where
exports.byCataloguesWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id,group_s,lang,id_merek,id_category, status } = req.body;
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
    if (group_s) {
      whereClause.group_s = group_s;
    }
    // Cek jika parameter id_merek
    if (id_merek) {
      whereClause.id_merek = id_merek;
    }
    // Cek jika parameter id_category
    if (id_category) {
      whereClause.id_category = id_category;
    }
    if (status) {
      whereClause.status = status;
    }
    const databyCataloguesWhere = await byCataloguesWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databyCataloguesWhere.statusCode,
      status: databyCataloguesWhere.status,
      message: databyCataloguesWhere.message,
      transactionId: log.TransactionID,
      totalData: databyCataloguesWhere.totalData,
      data: databyCataloguesWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databyCataloguesWhere.statusCode).json(response);
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

// add Catalogues
exports.addCatalogues = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    group_s,
    lang,
    slug,
    name,
    id_merk,
    description,
    spec,
    image,
    id_category,
    status,
  } = req.body;
  try {
    const dataCatalogues = {
      group_s:group_s,
      lang:lang,
      slug: slug,
      name: name,
      id_merk: id_merk,
      description: description,
      spec: spec,
      image: image,
      id_category: id_category,
      status: status,
      insert_date: new Date(),
      insert_by: userLogin
    };
    // console.log(dataCatalogues);
    const dataCataloguesAdded = await addCatalogues(dataCatalogues);

    const response = {
      statusCode: dataCataloguesAdded.statusCode,
      status: dataCataloguesAdded.status,
      message: dataCataloguesAdded.message,
      transactioId: log.TransactionID,
      data: dataCataloguesAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataCataloguesAdded.statusCode).json(response);
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
// update Catalogues
exports.updateCatalogues = async (req, res) => {
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
    group_s,
    lang,
    slug,
    name,
    id_merek,
    description,
    spec,
    image,
    id_category,
    status,
  } = req.body;
  try {
    const dataCatalogues = {
        group_s:group_s,
        lang:lang,
        slug: slug,
        name: name,
        id_merek: id_merek,
        description: description,
        spec: spec,
        image: image,
        id_category: id_category,
        status: status,
    };
    // console.log(dataCatalogues);
    const dataCataloguesUpdated = await updateCatalogues(id, dataCatalogues);

    const response = {
      statusCode: dataCataloguesUpdated.statusCode,
      status: dataCataloguesUpdated.status,
      message: dataCataloguesUpdated.message,
      transactioId: log.TransactionID,
      data: dataCataloguesUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataCataloguesUpdated.statusCode).json(response);
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

//delete Catalogues by id Catalogues
exports.deleteCatalogues = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataCataloguesDeleted = await deleteCatalogues(id);

      const response = {
        statusCode: dataCataloguesDeleted.statusCode,
        status: dataCataloguesDeleted.status,
        message: dataCataloguesDeleted.message,
        transactioId: log.TransactionID,
        data: dataCataloguesDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataCataloguesDeleted.statusCode).json(response);
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
