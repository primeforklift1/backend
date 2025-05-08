const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  byMenuWhere
} = require("../models/modelMenu");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

// Menu by where
exports.byMenuWhere = async (req, res) => {
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
      // Cek jika parameter lang
      if (lang) {
        whereClause.lang = lang;
      }
      // Cek jika parameter status_aktif
      if (status) {
        whereClause.status = status;
      }
      const databyMenuWhere = await byMenuWhere(whereClause, page, rowCount);

      let parent = [];
      let child = [];
      for(let i=0;i<databyMenuWhere.data.length;i++){
        if(databyMenuWhere.data[i].parent == null){
            parent.push(databyMenuWhere.data[i]);
        }else{
            child.push(databyMenuWhere.data[i]);
        }
      }

      parent.sort((a, b) => a.order - b.order);
      child.sort((a, b) => a.order - b.order);

      let menuStructure = [];

      for(let j=0;j<parent.length;j++){
        let appendChild = [];
        for(let k=0;k<child.length;k++){
            if(parent[j].id == child[k].parent){
                appendChild.push(child[k]);
            }
        }
        menuStructure[j] = {
            ...parent[j].toJSON(),
            child : appendChild
        }

      }
  
      const response = {
        statusCode: databyMenuWhere.statusCode,
        status: databyMenuWhere.status,
        message: databyMenuWhere.message,
        transactionId: log.TransactionID,
        totalData: databyMenuWhere.totalData,
        data: menuStructure,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(databyMenuWhere.statusCode).json(response);
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