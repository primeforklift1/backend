const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    message,
    byMessage,
    byMessageWhere,
    addMessage,
    updateMessage,
    deleteMessage,
} = require("../models/modelMessage");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};


exports.message = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataMessage = await message(page, rowCount);

        const response = {
            statusCode: dataMessage.statusCode,
            status: dataMessage.status,
            message: dataMessage.message,
            transactioId: log.TransactionID,
            totalData: dataMessage.totalData,
            data: dataMessage.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMessage.statusCode).json(response);
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

// message by id
exports.byMessage = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMessage = await byMessage(id);

            const response = {
                statusCode: dataMessage.statusCode,
                status: dataMessage.status,
                message: dataMessage.message,
                transactionId: log.TransactionID,
                data: dataMessage.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMessage.statusCode).json(response);
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
// Message by where
exports.byMessageWhere = async (req, res) => {
    const log = logger.loggerData({ req });
    const { id,group_s, lang,country, email, status } = req.body;
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
      // Cek jika parameter country
      if (country) {
        whereClause.country = country;
      }
      // Cek jika parameter email
      if (email) {
        whereClause.email = email;
      }
  
      if (status) {
        whereClause.status = status;
      }
      const databyMessageWhere = await byMessageWhere(whereClause, page, rowCount);
  
      const response = {
        statusCode: databyMessageWhere.statusCode,
        status: databyMessageWhere.status,
        message: databyMessageWhere.message,
        transactionId: log.TransactionID,
        totalData: databyMessageWhere.totalData,
        data: databyMessageWhere.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(databyMessageWhere.statusCode).json(response);
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

// add Message
exports.addMessage = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        lang,
        group_s,
        country,
        name,
        email,
        telp,
        address,
        message,
        status,
    } = req.body;
    try {
        const dataMessage = {
            lang: lang,
            group_s: group_s,
            country: country,
            name: name,
            email: email,
            telp: telp,
            address: address,
            message: message,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataMessage);
        const dataMessageAdded = await addMessage(dataMessage);

        const response = {
            statusCode: dataMessageAdded.statusCode,
            status: dataMessageAdded.status,
            message: dataMessageAdded.message,
            transactioId: log.TransactionID,
            data: dataMessageAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMessageAdded.statusCode).json(response);
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
// update Message
exports.updateMessage = async (req, res) => {
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
        country,
        name,
        email,
        telp,
        address,
        message,
        status,
    } = req.body;
    try {
        const dataMessage = {
            group_s: group_s,
            lang: lang,
            country: country,
            name: name,
            email: email,
            telp: telp,
            address: address,
            message: message,
            status: status,
        };
        // console.log(dataMessage);
        const dataMessageUpdated = await updateMessage(id, dataMessage);

        const response = {
            statusCode: dataMessageUpdated.statusCode,
            status: dataMessageUpdated.status,
            message: dataMessageUpdated.message,
            transactioId: log.TransactionID,
            data: dataMessageUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMessageUpdated.statusCode).json(response);
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

//delete Message by id Message
exports.deleteMessage = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMessageDeleted = await deleteMessage(id);

            const response = {
                statusCode: dataMessageDeleted.statusCode,
                status: dataMessageDeleted.status,
                message: dataMessageDeleted.message,
                transactioId: log.TransactionID,
                data: dataMessageDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMessageDeleted.statusCode).json(response);
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
