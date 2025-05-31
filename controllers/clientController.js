const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
    client,
    byClient,
    byClientWhere,
    addClient,
    updateClient,
    deleteClient,
} = require("../models/modelClient");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};


exports.client = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataClient = await client(page, rowCount);

        const response = {
            statusCode: dataClient.statusCode,
            status: dataClient.status,
            message: dataClient.message,
            transactioId: log.TransactionID,
            totalData: dataClient.totalData,
            data: dataClient.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataClient.statusCode).json(response);
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

// client by id
exports.byClient = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataClient = await byClient(id);

            const response = {
                statusCode: dataClient.statusCode,
                status: dataClient.status,
                message: dataClient.message,
                transactionId: log.TransactionID,
                data: dataClient.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataClient.statusCode).json(response);
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
// Client by where
exports.byClientWhere = async (req, res) => {
    const log = logger.loggerData({ req });
    const { id, group_s, lang, status } = req.body;
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

        if (group_s) {
            whereClause.group_s = group_s;
        }
        // Cek jika parameter status_aktif
        if (status) {
            whereClause.status = status;
        }
        const databyClientWhere = await byClientWhere(whereClause, page, rowCount);

        const response = {
            statusCode: databyClientWhere.statusCode,
            status: databyClientWhere.status,
            message: databyClientWhere.message,
            transactionId: log.TransactionID,
            totalData: databyClientWhere.totalData,
            data: databyClientWhere.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(databyClientWhere.statusCode).json(response);
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

// add Client
exports.addClient = async (req, res) => {
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
        name,
        image,
        link,
        status,
    } = req.body;
    try {
        const dataClient = {
            group_s: group_s,
            lang: lang,
            name: name,
            image: image,
            link: link,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataClient);
        const dataClientAdded = await addClient(dataClient);

        const response = {
            statusCode: dataClientAdded.statusCode,
            status: dataClientAdded.status,
            message: dataClientAdded.message,
            transactioId: log.TransactionID,
            data: dataClientAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataClientAdded.statusCode).json(response);
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
// update Client
exports.updateClient = async (req, res) => {
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
        name,
        image,
        link,
        status,
    } = req.body;
    try {
        const dataClient = {
            group_s:group_s,
            lang:lang,
            name: name,
            image: image,
            link: link,
            status: status,
        };
        // console.log(dataClient);
        const dataClientUpdated = await updateClient(id, dataClient);

        const response = {
            statusCode: dataClientUpdated.statusCode,
            status: dataClientUpdated.status,
            message: dataClientUpdated.message,
            transactioId: log.TransactionID,
            data: dataClientUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataClientUpdated.statusCode).json(response);
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

//delete Client by id Client
exports.deleteClient = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataClientDeleted = await deleteClient(id);

            const response = {
                statusCode: dataClientDeleted.statusCode,
                status: dataClientDeleted.status,
                message: dataClientDeleted.message,
                transactioId: log.TransactionID,
                data: dataClientDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataClientDeleted.statusCode).json(response);
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
