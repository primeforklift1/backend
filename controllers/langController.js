const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    Language,
    byLanguage,
    byLanguageWhere,
    addLanguage,
    updateLanguage,
    deleteLanguage,
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


// language by id
exports.byLanguage = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataLanguage = await byLanguage(id);

            const response = {
                statusCode: dataLanguage.statusCode,
                status: dataLanguage.status,
                message: dataLanguage.message,
                transactionId: log.TransactionID,
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
// Language by where
exports.byLanguageWhere = async (req, res) => {
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

        if (status) {
            whereClause.status = status;
        }
        const databyLanguageWhere = await byLanguageWhere(whereClause, page, rowCount);

        const response = {
            statusCode: databyLanguageWhere.statusCode,
            status: databyLanguageWhere.status,
            message: databyLanguageWhere.message,
            transactionId: log.TransactionID,
            totalData: databyLanguageWhere.totalData,
            data: databyLanguageWhere.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(databyLanguageWhere.statusCode).json(response);
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

// add Language
exports.addLanguage = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        sort_name,
        name,
        flag_image,
        status
    } = req.body;
    try {
        const dataLanguage = {
            sort_name: sort_name,
            name: name,
            flag_image: flag_image,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataLanguage);
        const dataLanguageAdded = await addLanguage(dataLanguage);

        const response = {
            statusCode: dataLanguageAdded.statusCode,
            status: dataLanguageAdded.status,
            message: dataLanguageAdded.message,
            transactioId: log.TransactionID,
            data: dataLanguageAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataLanguageAdded.statusCode).json(response);
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
// update Language
exports.updateLanguage = async (req, res) => {
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
        sort_name,
        name,
        flag_image,
        status,
    } = req.body;
    try {
        const dataLanguage = {
            sort_name: sort_name,
            name: name,
            flag_image: flag_image,
            status: status,
        };
        // console.log(dataLanguage);
        const dataLanguageUpdated = await updateLanguage(id, dataLanguage);

        const response = {
            statusCode: dataLanguageUpdated.statusCode,
            status: dataLanguageUpdated.status,
            message: dataLanguageUpdated.message,
            transactioId: log.TransactionID,
            data: dataLanguageUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataLanguageUpdated.statusCode).json(response);
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

//delete Language by id Language
exports.deleteLanguage = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataLanguageDeleted = await deleteLanguage(id);

            const response = {
                statusCode: dataLanguageDeleted.statusCode,
                status: dataLanguageDeleted.status,
                message: dataLanguageDeleted.message,
                transactioId: log.TransactionID,
                data: dataLanguageDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataLanguageDeleted.statusCode).json(response);
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

