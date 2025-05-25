const jwtLib = require("../config/jwt");
const crypto = require("crypto");
const { TranslationServiceClient } = require('@google-cloud/translate').v3;
// Impor library

// Path ke file kunci JSON
const CREDENTIALS = require('../config/key-api-google-translate.json');
require("dotenv").config();

const logger = require("../config/logger");

const response500 = {
    status: "Error",
    message: "Internal Server Error!",
};
const response400 = {
    status: "Error",
    message: "Bad Request!",
};

// add Translate
exports.addTranslate = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        textData,
        from,
        to
    } = req.body;

    if (!textData || !to || !from) {
        return res.status(400).json(response400);
    }

    try {
        let sisaQuota = 450000;

        const usedQuota = textData.length;
        const remainingQuota = sisaQuota - usedQuota;


        // Inisialisasi klien Google Translate API
        const client = new TranslationServiceClient({
            credentials: CREDENTIALS,
            projectId: CREDENTIALS.project_id,
        });

        // Fungsi menerjemahkan teks
        async function translateText(textData, to) {
            const request = {
                parent: `projects/${CREDENTIALS.project_id}/locations/global`,
                contents: [textData],
                mimeType: 'text/plain',
                sourceLanguageCode: from,
                targetLanguageCode: to,
            };

            const [response] = await client.translateText(request);
            return response.translations.map(t => t.translatedText);
        }
        // console.log(dataTranslate);
        const dataTranslateAdded = await translateText(textData, to);
        const response = {
            statusCode: 200,
            status: "Success",
            message: "Data Berhasil di Translate!",
            transactioId: log.TransactionID,
            data: dataTranslateAdded,
            usedQuota,
            remainingQuota
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(200).json(response);
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