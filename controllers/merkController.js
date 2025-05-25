const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    merk,
    byMerk,
    byMerkWhere,
    addMerk,
    updateMerk,
    deleteMerk,
} = require("../models/modelMerk");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};


exports.merk = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataMerk = await merk(page, rowCount);

        const response = {
            statusCode: dataMerk.statusCode,
            status: dataMerk.status,
            message: dataMerk.message,
            transactioId: log.TransactionID,
            totalData: dataMerk.totalData,
            data: dataMerk.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMerk.statusCode).json(response);
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

// merk by id
exports.byMerk = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMerk = await byMerk(id);

            const response = {
                statusCode: dataMerk.statusCode,
                status: dataMerk.status,
                message: dataMerk.message,
                transactionId: log.TransactionID,
                data: dataMerk.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMerk.statusCode).json(response);
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
// Merk by where
exports.byMerkWhere = async (req, res) => {
    const log = logger.loggerData({ req });
    const { id, lang, status } = req.body;
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
        const databyMerkWhere = await byMerkWhere(whereClause, page, rowCount);

        const response = {
            statusCode: databyMerkWhere.statusCode,
            status: databyMerkWhere.status,
            message: databyMerkWhere.message,
            transactionId: log.TransactionID,
            totalData: databyMerkWhere.totalData,
            data: databyMerkWhere.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(databyMerkWhere.statusCode).json(response);
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

// add Merk
exports.addMerk = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        nama,
        status,
    } = req.body;
    try {
        const dataMerk = {
            nama: nama,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataMerk);
        const dataMerkAdded = await addMerk(dataMerk);

        const response = {
            statusCode: dataMerkAdded.statusCode,
            status: dataMerkAdded.status,
            message: dataMerkAdded.message,
            transactioId: log.TransactionID,
            data: dataMerkAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMerkAdded.statusCode).json(response);
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
// update Merk
exports.updateMerk = async (req, res) => {
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
        nama,
        status,
    } = req.body;
    try {
        const dataMerk = {
            nama: nama,
            status: status,
        };
        // console.log(dataMerk);
        const dataMerkUpdated = await updateMerk(id, dataMerk);

        const response = {
            statusCode: dataMerkUpdated.statusCode,
            status: dataMerkUpdated.status,
            message: dataMerkUpdated.message,
            transactioId: log.TransactionID,
            data: dataMerkUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMerkUpdated.statusCode).json(response);
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

//delete Merk by id Merk
exports.deleteMerk = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMerkDeleted = await deleteMerk(id);

            const response = {
                statusCode: dataMerkDeleted.statusCode,
                status: dataMerkDeleted.status,
                message: dataMerkDeleted.message,
                transactioId: log.TransactionID,
                data: dataMerkDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMerkDeleted.statusCode).json(response);
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
