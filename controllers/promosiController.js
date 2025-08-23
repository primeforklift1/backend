const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    promosi,
    byPromosi,
    byPromosiWhere,
    addPromosi,
    updatePromosi,
    deletePromosi,
} = require("../models/modelPromosi");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};


exports.promosi = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataPromosi = await promosi(page, rowCount);

        const response = {
            statusCode: dataPromosi.statusCode,
            status: dataPromosi.status,
            message: dataPromosi.message,
            transactioId: log.TransactionID,
            totalData: dataPromosi.totalData,
            data: dataPromosi.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataPromosi.statusCode).json(response);
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

// promosi by id
exports.byPromosi = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataPromosi = await byPromosi(id);

            const response = {
                statusCode: dataPromosi.statusCode,
                status: dataPromosi.status,
                message: dataPromosi.message,
                transactionId: log.TransactionID,
                data: dataPromosi.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataPromosi.statusCode).json(response);
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
// Promosi by where
exports.byPromosiWhere = async (req, res) => {
    const log = logger.loggerData({ req });
    const { id, lang, status, start_date, end_date } = req.body;
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;
    try {
        let whereClause = {};
        //   whereClause.lang = 'id';
        // Cek jika parameter id
        if (id) {
            whereClause.id = id;
        }
        if (lang) {
            whereClause.lang = lang;
        }

        // Cek jika parameter status_aktif
        if (status) {
            whereClause.status = status;
        }
        if (start_date) {
            whereClause.start_date = start_date;
        }
        if (end_date) {
            whereClause.end_date = end_date;
        }
        const databyPromosiWhere = await byPromosiWhere(whereClause, page, rowCount);

        const response = {
            statusCode: databyPromosiWhere.statusCode,
            status: databyPromosiWhere.status,
            message: databyPromosiWhere.message,
            transactionId: log.TransactionID,
            totalData: databyPromosiWhere.totalData,
            data: databyPromosiWhere.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(databyPromosiWhere.statusCode).json(response);
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

// add Promosi
exports.addPromosi = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        lang,
        title,
        image,
        start_date,
        end_date,
        status,
    } = req.body;
    try {
        const dataPromosi = {
            lang: lang,
            title: title,
            image: image,
            start_date: start_date,
            end_date: end_date,
            status: status
        };
        // console.log(dataPromosi);
        const dataPromosiAdded = await addPromosi(dataPromosi);

        const response = {
            statusCode: dataPromosiAdded.statusCode,
            status: dataPromosiAdded.status,
            message: dataPromosiAdded.message,
            transactioId: log.TransactionID,
            data: dataPromosiAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataPromosiAdded.statusCode).json(response);
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
// update Promosi
exports.updatePromosi = async (req, res) => {
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
        title,
        image,
        start_date,
        end_date,
        status,
    } = req.body;
    try {
        const dataPromosi = {
            lang:lang,
            title: title,
            image: image,
            start_date: start_date,
            end_date: end_date,
            status: status,
        };
        // console.log(dataPromosi);
        const dataPromosiUpdated = await updatePromosi(id, dataPromosi);

        const response = {
            statusCode: dataPromosiUpdated.statusCode,
            status: dataPromosiUpdated.status,
            message: dataPromosiUpdated.message,
            transactioId: log.TransactionID,
            data: dataPromosiUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataPromosiUpdated.statusCode).json(response);
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

//delete Promosi by id Promosi
exports.deletePromosi = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataPromosiDeleted = await deletePromosi(id);

            const response = {
                statusCode: dataPromosiDeleted.statusCode,
                status: dataPromosiDeleted.status,
                message: dataPromosiDeleted.message,
                transactioId: log.TransactionID,
                data: dataPromosiDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataPromosiDeleted.statusCode).json(response);
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
