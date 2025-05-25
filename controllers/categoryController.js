const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    category,
    byCategory,
    byCategoryWhere,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../models/modelCategory");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};


exports.category = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataCategory = await category(page, rowCount);

        const response = {
            statusCode: dataCategory.statusCode,
            status: dataCategory.status,
            message: dataCategory.message,
            transactioId: log.TransactionID,
            totalData: dataCategory.totalData,
            data: dataCategory.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataCategory.statusCode).json(response);
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

// category by id
exports.byCategory = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataCategory = await byCategory(id);

            const response = {
                statusCode: dataCategory.statusCode,
                status: dataCategory.status,
                message: dataCategory.message,
                transactionId: log.TransactionID,
                data: dataCategory.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataCategory.statusCode).json(response);
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
// Category by where
exports.byCategoryWhere = async (req, res) => {
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
      const databyCategoryWhere = await byCategoryWhere(whereClause, page, rowCount);
  
      const response = {
        statusCode: databyCategoryWhere.statusCode,
        status: databyCategoryWhere.status,
        message: databyCategoryWhere.message,
        transactionId: log.TransactionID,
        totalData: databyCategoryWhere.totalData,
        data: databyCategoryWhere.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(databyCategoryWhere.statusCode).json(response);
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

// add Category
exports.addCategory = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        lang,
        parent_id,
        name,
        status,
    } = req.body;
    try {
        const dataCategory = {
            lang: lang,
            parent_id: parent_id,
            name: name,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataCategory);
        const dataCategoryAdded = await addCategory(dataCategory);

        const response = {
            statusCode: dataCategoryAdded.statusCode,
            status: dataCategoryAdded.status,
            message: dataCategoryAdded.message,
            transactioId: log.TransactionID,
            data: dataCategoryAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataCategoryAdded.statusCode).json(response);
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
// update Category
exports.updateCategory = async (req, res) => {
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
        parent_id,
        name,
        status,
    } = req.body;
    try {
        const dataCategory = {
            lang: lang,
            parent_id: parent_id,
            name: name,
            status: status,
        };
        // console.log(dataCategory);
        const dataCategoryUpdated = await updateCategory(id, dataCategory);

        const response = {
            statusCode: dataCategoryUpdated.statusCode,
            status: dataCategoryUpdated.status,
            message: dataCategoryUpdated.message,
            transactioId: log.TransactionID,
            data: dataCategoryUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataCategoryUpdated.statusCode).json(response);
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

//delete Category by id Category
exports.deleteCategory = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataCategoryDeleted = await deleteCategory(id);

            const response = {
                statusCode: dataCategoryDeleted.statusCode,
                status: dataCategoryDeleted.status,
                message: dataCategoryDeleted.message,
                transactioId: log.TransactionID,
                data: dataCategoryDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataCategoryDeleted.statusCode).json(response);
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
